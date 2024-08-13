import Footer from "@/components/footer";
import Header from "@/components/header";

const BaseLayout = ({children}:{children:React.ReactNode}) => {
    return (
        <div>
            <Header />
            <div>{children}</div>
            <Footer />
        </div>
    );
}

export default BaseLayout;