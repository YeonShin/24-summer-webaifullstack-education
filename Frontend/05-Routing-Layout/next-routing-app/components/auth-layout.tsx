import Footer from "@/components/footer";
import Header from "@/components/header";
import MyPageMenu from "./mypage-menu";

const AuthLayout = ({children}:{children:React.ReactNode}) => {
    return (
        <div>
            <Header />
            <div className="flex">
                <div className="w-2/12 bg-blue-500"><MyPageMenu /></div>

                <div className="w-10/12 bg-green-500">{children}</div>
            </div>
            <Footer />
        </div>
    );
}

export default AuthLayout;