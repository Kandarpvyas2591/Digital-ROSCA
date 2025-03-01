import { useRouteError } from 'react-router-dom';
import LinkButton from './LinkButton';

function Error() {
  const error = useRouteError();
  console.log(error);

  return (
    <div className="flex h-screen items-center justify-center bg-[#F5F5F5]">
      <div className="h-auto w-4/5 max-w-[300px] rounded-2xl bg-white [--shadow:rgba(60,64,67,0.3)_0_1px_2px_0,rgba(60,64,67,0.15)_0_2px_6px_2px] [box-shadow:var(--shadow)]">
        <div className="relative flex flex-col items-center justify-between px-6 pb-6 pt-9">
          <span className="relative mx-auto -mt-16 mb-8">
            <img
              className="h-20 w-20"
              src="https://e7.pngegg.com/pngimages/10/205/png-clipart-computer-icons-error-information-error-angle-triangle-thumbnail.png"
              alt="Error"
            />
          </span>

          <h5 className="mb-2 mr-auto text-left text-2xl font-semibold text-zinc-700">
            404 - Page not found
          </h5>

          <p className="mb-4 w-full text-justify text-lg">{error.data}</p>

          <LinkButton to="-1">&larr; Go back</LinkButton>
        </div>
      </div>
    </div>
  );
}

export default Error;
