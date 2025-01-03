import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "@/modules/shared/store/user-context";
import { AccountType } from "@/modules/shared/types/User.types";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import ListItem from "./NavigationDropDown";
import { UserCog } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export default function NavigationBar({ fontColor }: { fontColor: string }) {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  function handleStyles(props: { isActive: boolean }) {
    return cn(
      "px-3 py-2 font-medium transition-all duration-200",
      "hover:text-accent-gold hover:drop-shadow-glow",
      props.isActive ? "text-accent-gold drop-shadow-glow" : fontColor,
    );
  }

  function handleClearUser() {
    setUser({
      _id: "",
      password: "",
      username: "",
      account_type: AccountType.None,
      accepted: false,
      rejected: false,
      deletionRequested: false,
      termsAndConditions: false,
    });
  }

  return (
    <div className="relative z-10 flex items-center py-7">
      {/* Backdrop blur container */}
      <div className="absolute inset-0 -z-10 bg-black/10 backdrop-blur-md" />

      {/* change currency */}
      <div className="ml-2 flex w-[12%] items-center gap-5">
        <select
          id="currency"
          name="currency"
          value={localStorage.getItem("currency") || "EGP"}
          className="rounded-md border border-primary-green bg-transparent px-2 py-1 text-primary-blue"
          onChange={(e) => {
            localStorage.setItem("currency", e.target.value);
            window.location.reload();
          }}
        >
          <option value="EGP">EGP</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>
      </div>

      <div className="flex w-full justify-center">
        <NavigationMenu className="relative mx-auto">
          <NavigationMenuList className="flex justify-around space-x-8">
            <NavigationMenuItem className="text-sub-headings">
              <NavLink to="/home" className={(props) => handleStyles(props)}>
                Home
              </NavLink>
            </NavigationMenuItem>

            <NavigationMenuItem className="relative">
              <NavigationMenuTrigger
                className={cn(
                  handleStyles({ isActive: false }),
                  "bg-transparent hover:bg-transparent",
                  "data-[state=open]:drop-shadow-glow text-sub-headings data-[state=open]:bg-transparent data-[state=open]:text-accent-gold",
                )}
              >
                Activities
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-black/90 backdrop-blur-md">
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <ListItem
                    title="Browse All"
                    to={
                      user.account_type === AccountType.None
                        ? "/all-activities"
                        : "/home/all-activities"
                    }
                  >
                    View all available activities
                  </ListItem>
                  {user.account_type === AccountType.Advertiser && (
                    <ListItem title="Browse My" to="/home/my-activities">
                      View your activities
                    </ListItem>
                  )}
                  {user.account_type === AccountType.Admin && (
                    <ListItem
                      title="Admin"
                      to="/home/admin-dashboard/activity-categories"
                    >
                      Manage activities category
                    </ListItem>
                  )}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem className="relative">
              <NavigationMenuTrigger
                className={cn(
                  handleStyles({ isActive: false }),
                  "bg-transparent hover:bg-transparent",
                  "data-[state=open]:drop-shadow-glow text-sub-headings data-[state=open]:bg-transparent data-[state=open]:text-accent-gold",
                )}
              >
                Historical Places/ Museums
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-black/90 backdrop-blur-md">
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <ListItem
                    title="All Places"
                    to={
                      user.account_type === AccountType.None
                        ? "/all-museums"
                        : "/home/all-museums"
                    }
                  >
                    Explore all historical places/ museums
                  </ListItem>
                  {user.account_type === AccountType.TourismGovernor && (
                    <ListItem title="My Places" to="/home/my-museums">
                      View your historical places/ museums
                    </ListItem>
                  )}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem className="relative">
              <NavigationMenuTrigger
                className={cn(
                  handleStyles({ isActive: false }),
                  "bg-transparent hover:bg-transparent",
                  "data-[state=open]:drop-shadow-glow text-sub-headings data-[state=open]:bg-transparent data-[state=open]:text-accent-gold",
                )}
              >
                Itineraries
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-black/90 backdrop-blur-md">
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <ListItem
                    title="View All"
                    to={
                      user.account_type === AccountType.None
                        ? "/all-itineraries"
                        : "/home/all-itineraries"
                    }
                  >
                    Browse all itineraries
                  </ListItem>
                  {user.account_type === AccountType.TourGuide && (
                    <ListItem title="My Itineraries" to="/home/my-itineraries">
                      View your itineraries
                    </ListItem>
                  )}
                  {user.account_type === AccountType.Admin && (
                    <ListItem
                      title="Admin"
                      to="/home/admin-dashboard/flag-itineraries"
                    >
                      Manage itineraries
                    </ListItem>
                  )}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {(user.account_type === AccountType.Tourist ||
              user.account_type === AccountType.Admin ||
              user.account_type === AccountType.Seller) && (
              <NavigationMenuItem className="relative">
                <NavigationMenuTrigger
                  className={cn(
                    handleStyles({ isActive: false }),
                    "bg-transparent hover:bg-transparent",
                    "data-[state=open]:drop-shadow-glow text-sub-headings data-[state=open]:bg-transparent data-[state=open]:text-accent-gold",
                  )}
                >
                  Products
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-black/90 backdrop-blur-md">
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <ListItem title="All Products" to="/home/all-products">
                      View all products
                    </ListItem>
                    {user.account_type === AccountType.Seller && (
                      <ListItem
                        title="My Products"
                        to="/home/my-products-seller"
                      >
                        View your products
                      </ListItem>
                    )}
                    {user.account_type === AccountType.Admin && (
                      <ListItem
                        title="Admin"
                        to="/home/admin-dashboard/my-products-admin"
                      >
                        Manage products
                      </ListItem>
                    )}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            )}

            {user.account_type === AccountType.Tourist && (
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={cn(
                    handleStyles({ isActive: false }),
                    "bg-transparent hover:bg-transparent",
                    "text-sub-headings data-[state=open]:bg-transparent data-[state=open]:text-accent-gold",
                  )}
                >
                  Bookings
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-black/80 backdrop-blur-sm">
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <ListItem title="Activities" to="/home/activity-bookings">
                      View Activity Bookings
                    </ListItem>
                    <ListItem title="Itineraries" to="/home/itinerary-bookings">
                      View Itinerary Bookings
                    </ListItem>
                    <ListItem
                      title="Transportation"
                      to="/home/transportation-bookings"
                    >
                      View Transportation Bookings
                    </ListItem>
                    <ListItem title="Flights" to="/home/flight-bookings">
                      Book Flights
                    </ListItem>
                    <ListItem title="Hotels" to="/home/hotel-bookings">
                      Book Hotels
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            )}

            {user.account_type === AccountType.Tourist && (
              <NavigationMenuItem className="text-sub-headings">
                <NavLink
                  to="/home/history"
                  className={(props) => handleStyles(props)}
                >
                  History
                </NavLink>
              </NavigationMenuItem>
            )}

            {(user.account_type === AccountType.Tourist ||
              user.account_type === AccountType.Admin) && (
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={cn(
                    handleStyles({ isActive: false }),
                    "bg-transparent hover:bg-transparent",
                    "text-sub-headings data-[state=open]:bg-transparent data-[state=open]:text-accent-gold",
                  )}
                >
                  Complaints
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-black/80 backdrop-blur-sm">
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {user.account_type === AccountType.Tourist && (
                      <ListItem title="My Complaints" to="/home/my-complaints">
                        My complaints
                      </ListItem>
                    )}
                    {user.account_type === AccountType.Admin && (
                      <ListItem
                        title="Manage Complaints"
                        to="/home/admin-dashboard/admin-complaints"
                      >
                        Manage complaints
                      </ListItem>
                    )}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="flex w-[12%] items-center gap-5">
        {user.account_type !== AccountType.None && (
          <UserCog
            onClick={() => {
              if (user.account_type === AccountType.TourGuide) {
                return navigate(`/home/tour-guide-profile/${user._id}`);
              }
              if (user.account_type === AccountType.TourismGovernor) {
                return navigate(`/home/tourism-governor-profile/${user._id}`);
              }
              if (user.account_type === AccountType.Admin) {
                return navigate("/home/admin-dashboard");
              }
              return navigate(
                `/home/${user.account_type.toLowerCase()}-profile/${user._id}`,
              );
            }}
            size={40}
            className="hover:shadow-glow rounded-full bg-accent-gold p-2 transition-all duration-150 hover:cursor-pointer hover:opacity-70"
          />
        )}

        <Button
          variant="default"
          onClick={() => {
            if (user.account_type !== AccountType.None) {
              handleClearUser();
              localStorage.removeItem("token");
              toast.success("Logged out successfully");
              navigate("/");
            } else navigate("/register");
          }}
          className="hover:shadow-glow min-w-fit rounded-2xl bg-accent-gold text-[20px] text-black transition-all duration-150 hover:bg-accent-gold/70 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {user.account_type === AccountType.None ? "Register Now" : "Logout"}
        </Button>
      </div>
    </div>
  );
}
