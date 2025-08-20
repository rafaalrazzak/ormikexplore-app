import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

interface RobotsRule {
  userAgent: string;
  allow?: string[];
  disallow?: string[];
}

// Parse robots.txt content into rules
function parseRobotsContent(content: string): RobotsRule[] {
  const lines = content.split('\n');
  const rules: RobotsRule[] = [];
  let currentRule: Partial<RobotsRule> = {};
  
  for (const line of lines) {
    const trimmed = line.trim();
    
    // Skip empty lines and comments
    if (!trimmed || trimmed.startsWith('#')) continue;
    
    const [directive, ...valueParts] = trimmed.split(':');
    const value = valueParts.join(':').trim();
    
    switch (directive.toLowerCase()) {
      case 'user-agent':
        // Save previous rule if exists
        if (currentRule.userAgent) {
          rules.push(currentRule as RobotsRule);
        }
        // Start new rule
        currentRule = {
          userAgent: value,
          allow: [],
          disallow: []
        };
        break;
        
      case 'allow':
        if (currentRule.allow) {
          currentRule.allow.push(value);
        }
        break;
        
      case 'disallow':
        if (currentRule.disallow) {
          currentRule.disallow.push(value);
        }
        break;
    }
  }
  
  // Add the last rule
  if (currentRule.userAgent) {
    rules.push(currentRule as RobotsRule);
  }
  
  return rules;
}

// Check if URL matches a pattern
function matchesPattern(url: string, pattern: string): boolean {
  // Handle wildcard patterns
  if (pattern === '/') return true;
  if (pattern === '') return true;
  
  // Convert robots.txt pattern to regex
  let regexPattern = pattern
    .replace(/\./g, '\\.')
    .replace(/\*/g, '.*')
    .replace(/\$/, '$');
    
  if (pattern.endsWith('$')) {
    regexPattern = '^' + regexPattern;
  } else {
    regexPattern = '^' + regexPattern;
  }
  
  try {
    const regex = new RegExp(regexPattern);
    return regex.test(url);
  } catch {
    // Fallback to simple string matching
    return url.startsWith(pattern);
  }
}

// Test if URL is allowed by robots.txt
function testUrlAccess(url: string, content: string, userAgent: string = '*'): {
  allowed: boolean;
  matchedRule?: string;
  reason: string;
} {
  const rules = parseRobotsContent(content);
  
  // Find applicable rules for the user agent
  const applicableRules = rules.filter(rule => 
    rule.userAgent === userAgent || rule.userAgent === '*'
  );
  
  // If no rules found, default to allowed
  if (applicableRules.length === 0) {
    return {
      allowed: true,
      reason: 'No applicable rules found - default allow'
    };
  }
  
  // Extract path from URL
  let path;
  try {
    path = new URL(url).pathname;
  } catch {
    // If URL is relative, use as-is
    path = url.startsWith('/') ? url : '/' + url;
  }
  
  // Check rules in order (most specific user-agent first)
  const sortedRules = applicableRules.sort((a, b) => {
    if (a.userAgent === userAgent && b.userAgent === '*') return -1;
    if (a.userAgent === '*' && b.userAgent === userAgent) return 1;
    return 0;
  });
  
  for (const rule of sortedRules) {
    // Check disallow rules first
    if (rule.disallow) {
      for (const disallowPattern of rule.disallow) {
        if (matchesPattern(path, disallowPattern)) {
          return {
            allowed: false,
            matchedRule: `Disallow: ${disallowPattern}`,
            reason: `Blocked by disallow rule for ${rule.userAgent}`
          };
        }
      }
    }
    
    // Check allow rules
    if (rule.allow) {
      for (const allowPattern of rule.allow) {
        if (matchesPattern(path, allowPattern)) {
          return {
            allowed: true,
            matchedRule: `Allow: ${allowPattern}`,
            reason: `Allowed by allow rule for ${rule.userAgent}`
          };
        }
      }
    }
  }
  
  // If no specific rule matched, default to allowed
  return {
    allowed: true,
    reason: 'No matching rules - default allow'
  };
}

export async function POST(request: NextRequest) {
  try {
    const { url, content, userAgent = '*' } = await request.json();
    
    if (!url || !content) {
      return NextResponse.json(
        { error: 'URL and content are required' },
        { status: 400 }
      );
    }

    const result = testUrlAccess(url, content, userAgent);
    
    return NextResponse.json({
      url,
      userAgent,
      ...result,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error testing URL against robots.txt:', error);
    
    return NextResponse.json(
      { error: 'Internal server error during URL testing' },
      { status: 500 }
    );
  }
}
