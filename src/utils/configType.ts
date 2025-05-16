export type TemplateConfig = {
    name: string;
    seo: {
        title: string;
        description: string;
    };
    logo: string;
    theme: string;
    backgroundGrid: boolean;
    termsAndConditions: {
        seo: {
            title: string;
            description: string;
        };
        content: string;
    };
    privacyPolicy: {
        seo: {
            title: string;
            description: string;
        };
        content: string;
    };
    footer: {
        links: {
            title: string;
            href: string;
        }[];
        legalLinks: {
            termsAndConditions: boolean;
            privacyPolicy: boolean;
        };
        socials?: {
            instagram?: string | undefined;
            twitter?: string | undefined;
        } | undefined;
    };
    topNavbar: {
        disableWidthAnimation?: boolean | undefined;
        links: {
            title: string;
            href: string;
        }[];
        hideGooglePlay?: boolean | undefined;
        hideAppStore?: boolean | undefined;
    };
    home: {
        seo: {
            title: string;
            description: string;
        };
        header: {
            id?: string | undefined;
            hand: string;
            headline: string;
            place: string;
            businessDays: {
                [day: string]: string;
            }[];
        };
        testimonials?: {
            id?: string | undefined;
            title: string;
            subtitle?: string | undefined;
            cards: {
                name: string;
                comment: string;
            }[];
        } | undefined;
        supportedBy?: {
            id?: string | undefined;
            title: string;
            logos: string[];
        } | undefined;
        faq?: {
            id?: string | undefined;
            title: string;
            qa: {
                question: string;
                answer: string;
            }[];
        } | undefined;
        flow?: {
            id?: string | undefined;
            title: string;
            subtitle?: string | undefined;
            steps: {
                image: string;
                title: string;
                subtitle: string;
            }[];
        } | undefined;
        features?: {
            id?: string | undefined;
            title: string;
            subtitle?: string | undefined;
            cards: {
                icon: string;
                title: string;
                subtitle: string;
            }[];
        } | undefined;
        pricing?: {
            id?: string | undefined;
            title: string;
            actionText?: string | undefined;
            subtitle?: string | undefined;
            plans?: {
                title: string;
                price: string;
                image: string;
                rows: string[];
            }[] | undefined;
        } | undefined;
        contact?: {
            id?: string | undefined;
            form: {
                name: string;
                email: string;
                message: string;
            };
        } | undefined;  
    };
}
