import { extractWithContext } from "@/utils/helpers";

export const columns = [
    {
        accessorKey: "id",
        header: "ID",
        size: 150,
        enableSorting: false,
        enableColumnFilter: false,
    },
    {
        accessorKey: "title",
        header: "Title",
        size: 150,
        enableSorting: false,
        enableColumnFilter: false,
    },
    {
        accessorKey: "category.name",
        header: "Category",
        size: 50,
        enableSorting: false,
        enableColumnFilter: false,
    },
    {
        accessorKey: "content",
        header: "Content",
        size: 150,
        enableSorting: false,
        enableColumnFilter: false,
        Cell: ({ table, cell }) => {
            /**
             * #created by chatGPT */
            const globalFilter = table.options.state.globalFilter;
            const content = extractWithContext(cell.getValue(), globalFilter);

            if (!globalFilter) return content; // No highlight if no search term

            // Highlight the search term
            const highlightedContent = content.replace(
                new RegExp(`(${globalFilter})`, "gi"),
                `<span style="background-color: yellow; font-weight: bold;">$1</span>`,
            );

            return (
                <span
                    dangerouslySetInnerHTML={{ __html: highlightedContent }}
                />
            );
        },
    },
];
