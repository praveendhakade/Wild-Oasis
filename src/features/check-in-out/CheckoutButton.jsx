/* eslint-disable react/prop-types */
import Button from "../../ui/Button";
import {useCheckout} from "./hooks/useCheckout"

function CheckoutButton({ bookingId }) {
  const {checkout, ischeckingOut} = useCheckout()
  return (
    <Button variation="primary" size="small" onClick={() =>checkout(bookingId)} disabled={ischeckingOut}>
      Check out
    </Button>
  );
}

export default CheckoutButton;
