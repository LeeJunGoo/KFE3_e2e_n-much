import { Button } from '@repo/ui/components/ui/button';
import PageContainer from 'src/shared/ui/PageContainer';
import DetailPageHeader from 'src/widgets/DetailPageHeader';
import NotificationList from './components/NotificationList';

const NotificationPage = () => {
  return (
    <>
      <DetailPageHeader>알림</DetailPageHeader>
      <PageContainer className="pb-6 pt-4">
        <NotificationList />
        <Button variant="base" className="w-full py-5">
          더 많은 알림 불러오기
        </Button>
      </PageContainer>
    </>
  );
};

export default NotificationPage;
