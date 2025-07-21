import PageContainer from 'src/shared/ui/PageContainer';
import DetailPageHeader from 'src/widgets/DetailPageHeader';
import ContactForm from './components/ContactForm';

const ContactPage = () => {
  return (
    <>
      <DetailPageHeader>Vidding 팀에게 문의하기</DetailPageHeader>
      <PageContainer>
        <ContactForm />
      </PageContainer>
    </>
  );
};

export default ContactPage;
