import DefaultLayout from "./component/DefaultLayout";
import GlobalSyles from "./component/GlobalStyles";
import Login from "./login/page";
export default function Home() {
  return (
    <GlobalSyles>
      <DefaultLayout>
        <Login/>
      </DefaultLayout>
    </GlobalSyles>
      
  );
}
