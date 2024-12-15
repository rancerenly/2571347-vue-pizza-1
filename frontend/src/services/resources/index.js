import {AddressResource} from "@/services/providers/address.resource";
import {DoughResource} from "@/services/providers/dough.resource";
import {MiscResource} from "@/services/providers/misc.resource";
import {OrderResource} from "@/services/providers/order.resource";
import {SizeResource} from "@/services/providers/size.resource";
import {IngredientResource} from "@/services/providers/ingredient.resource";
import {SauceResource} from "@/services/providers/sauce.resource";


export default {
    address: new AddressResource(),
    dough: new DoughResource(),
    ingredient: new IngredientResource(),
    misc: new MiscResource(),
    order: new OrderResource(),
    sauce: new SauceResource(),
    size: new SizeResource(),
};
