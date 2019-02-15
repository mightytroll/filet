import AppRouter from "marionette.approuter";
import { IndexView } from "../views/IndexView";

export const IndexController = AppRouter.extend({
    routes: {
        "": "indexAction"
    },

    indexAction() {
        let view = new IndexView();
        this.options.app.showView(view);
    }
});
