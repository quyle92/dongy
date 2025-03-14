import Post from "@/pages/Post";
import { adminRoute } from "@/utils/helpers";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";

const menuItem = [
    {
        id: "post",
        icon: DocumentScannerIcon,
        path: adminRoute("/posts"),
        component: Post,
    },
];

export default menuItem;
