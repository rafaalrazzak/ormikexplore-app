import MaintenancePage from '@/components/pages/MaintenancePage';

export const metadata = {
     title: 'Maintenance - ORMIK EXPLORE 2025',
     description: 'Website sedang dalam proses maintenance. Kami akan segera kembali!',
     robots: {
          index: false,
          follow: false,
     },
};

export default function Maintenance() {
     return <MaintenancePage />;
}
