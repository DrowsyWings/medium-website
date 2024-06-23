import { Auth } from "../components/Auth";
import { Quotes } from "../components/quotes";

export function Signup() {
  return (
    <div className=" grid grid-cols-1 lg:grid-cols-2">
      <div>
        <Auth type="signup" />
      </div>
      <div className=" hidden lg:block">
        <Quotes />
      </div>
    </div>
  );
}
