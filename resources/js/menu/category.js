import Category from "@/pages/Category";
import { adminRoute } from "@/utils/helpers";
import CategoryIcon from "@mui/icons-material/Category";

const menuItem = [
    {
        id: "category",
        icon: CategoryIcon,
        path: adminRoute("/categories"),
        component: Category,
    },
];

export default menuItem;
