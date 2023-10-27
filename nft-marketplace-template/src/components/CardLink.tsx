import Link from "next/link";
import styles from "@/styles/Home.module.css";
import { FC } from "react";

interface CardProps {
    href: string;
    title: string;
    description: string;
}

const CardLink: FC<CardProps> = ({ href, title, description }) => {
    return (
        <Link href={href}>
            <div className={styles.card}>
                <h2>
                    {title} <span>-&gt;</span>
                </h2>
                <p>{description}</p>
            </div>
        </Link>
    );
};

export default CardLink;
