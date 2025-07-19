import AddressForm from 'src/features/addresses/components/AddressForm';
import PageContainer from 'src/shared/ui/PageContainer';
import DetailPageHeader from 'src/widgets/DetailPageHeader';

const AddressFormPage = () => {
  return (
    <>
      <DetailPageHeader>주소 추가</DetailPageHeader>
      <PageContainer className="relative px-4 pb-8">
        <section className="w-full">
          <AddressForm />
        </section>
      </PageContainer>
    </>
  );
};

export default AddressFormPage;
