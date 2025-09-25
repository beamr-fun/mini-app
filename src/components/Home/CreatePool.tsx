import { useEffect } from 'react';
import {
  Link,
  Navigate,
  Route,
  Routes,
  useNavigate,
  useParams,
} from 'react-router-dom';

export const CreatePool = () => {
  const navigate = useNavigate();
  const params = useParams();

  const subroute = params['*'];

  useEffect(() => {
    console.log('mount top');
  }, []);

  console.log('render top');

  return (
    <div>
      <h1>Create Pool</h1>
      <nav>
        <Link to="/create-pool/1">Step 1</Link> |{' '}
        <Link to="/create-pool/2">Step 2</Link>
      </nav>

      <Routes>
        <Route index element={<Navigate to="1" replace />} />
        <Route path="1" element={<Step1 />} />
        <Route path="2" element={<Step2 />} />
      </Routes>
    </div>
  );
};

const Step1 = () => {
  return <div> Step 1 </div>;
};

const Step2 = () => {
  return <div> Step 2 </div>;
};
