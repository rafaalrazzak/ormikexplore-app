/**
 * Robots.txt Configuration Service
 * Manages robots.txt generation settings and rules
 */

export interface RobotsRule {
  userAgent: string;
  allow?: string[];
  disallow?: string[];
  crawlDelay?: number;
}

export interface RobotsConfig {
  sitemap?: string;
  host?: string;
  rules: RobotsRule[];
}

export class RobotsService {
  private static instance: RobotsService;
  
  public static getInstance(): RobotsService {
    if (!RobotsService.instance) {
      RobotsService.instance = new RobotsService();
    }
    return RobotsService.instance;
  }

  /**
   * Get production robots configuration
   */
  public getProductionConfig(baseUrl: string): RobotsConfig {
    return {
      host: baseUrl,
      sitemap: `${baseUrl}/sitemap.xml`,
      rules: [
        {
          userAgent: '*',
          allow: [
            '/',
            '/handscan',
            '/api/'
          ],
          disallow: [
            '/maintenance',
            '/unauthorized',
            '/_next/',
            '/api/maintenance-bypass',
            '/*.json$',
            '/*.xml$',
            '/*.log$'
          ],
          crawlDelay: 1
        },
        {
          userAgent: 'Googlebot',
          allow: ['/'],
          crawlDelay: 0
        },
        {
          userAgent: 'Bingbot',
          allow: ['/'],
          crawlDelay: 1
        },
        {
          userAgent: 'facebookexternalhit',
          allow: ['/']
        },
        // Block problematic bots
        {
          userAgent: 'AhrefsBot',
          disallow: ['/']
        },
        {
          userAgent: 'MJ12bot',
          disallow: ['/']
        },
        {
          userAgent: 'SemrushBot',
          disallow: ['/']
        },
        {
          userAgent: 'DotBot',
          disallow: ['/']
        }
      ]
    };
  }

  /**
   * Get development robots configuration
   */
  public getDevelopmentConfig(): RobotsConfig {
    return {
      rules: [
        {
          userAgent: '*',
          disallow: ['/']
        }
      ]
    };
  }

  /**
   * Generate robots.txt content from configuration
   */
  public generateRobotsContent(config: RobotsConfig): string {
    let content = '';
    
    // Add header comment
    const isProduction = process.env.NODE_ENV === 'production';
    content += `# ORMIK Explore 2025 - ${isProduction ? 'Production' : 'Development'} Robots.txt\n`;
    content += '# Generated automatically\n\n';
    
    // Add rules for each user agent
    config.rules.forEach(rule => {
      content += `User-agent: ${rule.userAgent}\n`;
      
      // Add allow rules
      if (rule.allow && rule.allow.length > 0) {
        rule.allow.forEach(path => {
          content += `Allow: ${path}\n`;
        });
      }
      
      // Add disallow rules
      if (rule.disallow && rule.disallow.length > 0) {
        rule.disallow.forEach(path => {
          content += `Disallow: ${path}\n`;
        });
      }
      
      // Add crawl delay if specified
      if (rule.crawlDelay !== undefined) {
        content += `Crawl-delay: ${rule.crawlDelay}\n`;
      }
      
      content += '\n';
    });
    
    // Add sitemap if specified
    if (config.sitemap) {
      content += `Sitemap: ${config.sitemap}\n`;
    }
    
    // Add host if specified
    if (config.host) {
      content += `Host: ${config.host}\n`;
    }
    
    return content;
  }

  /**
   * Validate robots.txt content
   */
  public validateRobotsContent(content: string): {
    isValid: boolean;
    errors: string[];
    warnings: string[];
  } {
    const errors: string[] = [];
    const warnings: string[] = [];
    const lines = content.split('\n');
    
    let hasUserAgent = false;
    let currentUserAgent = '';
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Skip empty lines and comments
      if (!line || line.startsWith('#')) continue;
      
      // Check for valid directives
      if (line.toLowerCase().startsWith('user-agent:')) {
        hasUserAgent = true;
        currentUserAgent = line.split(':')[1]?.trim() || '';
        
        if (!currentUserAgent) {
          errors.push(`Line ${i + 1}: User-agent directive is missing value`);
        }
      } else if (line.toLowerCase().startsWith('disallow:') || 
                 line.toLowerCase().startsWith('allow:')) {
        if (!hasUserAgent) {
          errors.push(`Line ${i + 1}: Allow/Disallow directive without User-agent`);
        }
      } else if (line.toLowerCase().startsWith('crawl-delay:')) {
        const delay = line.split(':')[1]?.trim();
        if (!delay || isNaN(Number(delay))) {
          warnings.push(`Line ${i + 1}: Invalid crawl-delay value`);
        }
      } else if (line.toLowerCase().startsWith('sitemap:')) {
        const url = line.split(':')[1]?.trim();
        if (!url || !url.startsWith('http')) {
          warnings.push(`Line ${i + 1}: Invalid sitemap URL`);
        }
      } else {
        warnings.push(`Line ${i + 1}: Unknown directive: ${line}`);
      }
    }
    
    if (!hasUserAgent) {
      errors.push('No User-agent directive found');
    }
    
    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  /**
   * Get robots.txt statistics
   */
  public getStatistics(content: string): {
    totalLines: number;
    userAgents: number;
    allowRules: number;
    disallowRules: number;
    hasSitemap: boolean;
    hasHost: boolean;
  } {
    const lines = content.split('\n');
    let userAgents = 0;
    let allowRules = 0;
    let disallowRules = 0;
    let hasSitemap = false;
    let hasHost = false;
    
    lines.forEach(line => {
      const trimmed = line.trim().toLowerCase();
      if (trimmed.startsWith('user-agent:')) userAgents++;
      if (trimmed.startsWith('allow:')) allowRules++;
      if (trimmed.startsWith('disallow:')) disallowRules++;
      if (trimmed.startsWith('sitemap:')) hasSitemap = true;
      if (trimmed.startsWith('host:')) hasHost = true;
    });
    
    return {
      totalLines: lines.length,
      userAgents,
      allowRules,
      disallowRules,
      hasSitemap,
      hasHost
    };
  }
}
