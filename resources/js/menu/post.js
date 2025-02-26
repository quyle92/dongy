import Post from "@/pages/Post";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";

const menuItem = [
    {
        id: "post",
        icon: DocumentScannerIcon,
        path: "/posts",
        component: Post,
    },
];

export default menuItem;
