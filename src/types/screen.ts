import { BoArticle } from "./boArticle";
import { Order } from "./order";
import { Product } from "./product";
import { Member, Restaurant } from "./user";
import { OrdersPage } from "../app/screens/OrdersPage/index";
import { Follower, Following, Comments } from "./follow";

//**REACT APP STATE */
export interface AppRootState {
  memberPage: MemberPageState;
  homePage: HomePageState;
  restaurantPage: RestaurantPageState;
  ordersPage: OrdersPageState;
  communityPage: CommunityPageState;
}

//**HOMEPAGE */
export interface HomePageState {
  randomRestaurants: Restaurant[];
  newProducts: Product[];
  bestProducts: Product[];
  trendProducts: Product[];
  bestBoArticles: BoArticle[];
  trendBoArticles: BoArticle[];
  newsBoArticles: BoArticle[];
}

//**RESTAURANT PAGE */
export interface RestaurantPageState {
  targetRestaurants: Restaurant[];
  randomRestaurants: Restaurant[];
  chosenRestaurant: Restaurant | null;
  targetProducts: Product[];
  chosenProduct: Product | null;
  targetComments: Comments[];
}

//**ORDERS PAGE */
export interface OrdersPageState {
  pausedOrders: Order[];
  processOrders: Order[];
  finishedOrders: Order[];
}

//**COMMUNITY PAGE */
export interface CommunityPageState {
  targetBoArticles: BoArticle[];
}

//**MEMBER PAGE */
export interface MemberPageState {
  chosenMember: Member | null;
  chosenMemberBoArticles: BoArticle[];
  chosenSingleBoArticle: BoArticle | null;
  memberFollowers: Follower[];
  memberFollowings: Following[];
}
