import { useState } from "react";
import { usePage, router } from "@inertiajs/react";
import Layout from "@/layout/Layout";
import { MaterialReactTable } from "material-react-table";
import { columns } from "./postColumns";
import { cleanUrl } from "@/utils/helpers";
import { Alert, Card } from "react-bootstrap";

export default function Post() {
    const { url } = usePage();
    const { posts, flash } = usePage().props;
    const [pagination, setPagination] = useState({
        pageIndex: posts.current_page - 1,
        pageSize: posts.per_page,
    });
    const [globalFilter, setGlobalFilter] = useState("");

    return (
        <Card>
            <Card.Body>
                {flash.message && (
                    <Alert variant={"danger"} dismissible>
                        {flash.message}
                    </Alert>
                )}

                <MaterialReactTable
                    initialState={{
                        density: "compact",
                        showGlobalFilter: true,
                    }}
                    state={{ pagination, globalFilter }}
                    getRowId={(row) => row.id}
                    columns={columns}
                    data={posts.data}
                    rowCount={posts.total}
                    manualFiltering //turn off built-in client-side filtering
                    manualPagination //turn off built-in client-side pagination
                    manualSorting //turn off built-in client-side sorting
                    positionPagination={"top"}
                    onPaginationChange={function (updater) {
                        const nextPagination = updater(pagination);
                        router.get(
                            url,
                            {
                                page: nextPagination.pageIndex + 1,
                                perPage: nextPagination.pageSize,
                            },
                            {
                                preserveState: true,
                            },
                        );
                        setPagination(nextPagination);
                    }}
                    onGlobalFilterChange={function (val) {
                        if (setGlobalFilter) setGlobalFilter(val ?? "");
                        router.get(
                            cleanUrl(url),
                            {
                                globalFilter: val,
                            },
                            { preserveState: true },
                        );
                    }}
                />
            </Card.Body>
        </Card>
    );
}

Post.layout = (page) => <Layout children={page}></Layout>;
