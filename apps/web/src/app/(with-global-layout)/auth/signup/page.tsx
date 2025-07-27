import { signUp } from 'src/entities/auth/metaData';
import SignUpPage from 'src/features/auth/SignUpPage';

export const metadata = signUp;

const SignUp = () => {
  return (
    <>
      <SignUpPage />
    </>
  );
};

export default SignUp;
