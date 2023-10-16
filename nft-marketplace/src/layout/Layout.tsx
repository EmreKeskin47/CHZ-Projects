import React, { ReactNode } from "react";
import BackToHome from "@/components/BackToHome";
import styles from "@/styles/Home.module.css";

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <main className={styles.main}>
            <div className={styles.center}>
                <div>{children}</div>
            </div>
            <BackToHome />
        </main>
    );
};

export default Layout;
