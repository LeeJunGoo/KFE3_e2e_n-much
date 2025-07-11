import Image from 'next/image';
import PageTitle from 'src/shared/ui/PageTitle';
import BaseCard from 'src/widgets/BaseCard';
import SocialAuthSignUp from 'src/features/user/auth/components/SocialAuthSignUp';
import Logo from 'src/assets/images/logo.svg';
import { RiShieldCheckLine } from 'react-icons/ri';
import { MdOutlineInfo } from 'react-icons/md';
import PageContainer from 'src/shared/ui/PageContainer';

const SignUpPage = () => {
  return (
    <PageContainer className="h-screen w-full text-center">
      <section>
        <div>
          <Image src={Logo} alt="logo" className="mx-auto block size-20" />
          <div className="flex -translate-y-2 flex-col gap-1">
            <p>간편하게 시작하세요</p>
            <p className="text-sm opacity-60">소셜 계정으로 회원가입 및 로그인</p>
          </div>
        </div>
        <BaseCard as="div" className="my-5 w-full p-20 px-4 pb-10">
          <PageTitle className="text-2xl font-semibold">환영합니다! 👋</PageTitle>
          <p className="mb-6 mt-3 text-sm opacity-60">아래 계정으로 빠르게 시작해 보세요</p>
          <SocialAuthSignUp />
          <div className="mt-6 flex items-start justify-center gap-3 rounded-xl p-4">
            <RiShieldCheckLine size={20} className="text-(--color-green) translate-y-0.5" />
            <div>
              <p className="mb-1 flex text-sm">안전한 로그인</p>
              <p className="text-xs opacity-60">개인정보는 암호화되어 안전하게 보호됩니다.</p>
            </div>
          </div>
        </BaseCard>
        <div>
          <p className="mb-3 flex items-center justify-center gap-2 text-sm">
            <MdOutlineInfo size={15} className="text-(--color-accent)" />
            로그인 시 자동으로 회원가입됩니다
          </p>
          <p className="text-(--color-warm-gray) text-xs">
            계속 진행하시면 개인정보 보호정책 및 서비스 약관에 동의하는 것으로 간주됩니다.
          </p>
        </div>
      </section>
    </PageContainer>
  );
};

export default SignUpPage;
