import Layout from "@/layout/Layout";
import { usePage } from "@inertiajs/react";

export default function Category() {
    const { categories } = usePage().props;

    return <div>this is Category</div>;
}

Category.layout = (page) => <Layout children={page}></Layout>;
