"use client";
import { createOrder } from "@/actions/checkout";
// import { isAuthenticated } from "@/lib/authFunctions";
import { CheckoutFormData } from "@/types/checkoutType";
import { useActionState } from "react";
import { useForm } from "react-hook-form";

export default function CheckoutForm() {

  // const isUserAuthenticated = await isAuthenticated();

  const [state, formAction, isPending] = useActionState(createOrder,{
    success: false,
    error: undefined,
  });

  const { register, setValue, watch, formState: { errors }, } = useForm<CheckoutFormData>();


  const billingStreet = watch("street");
  const billingCity = watch("city");
  const billingState = watch("state");
  const billingZip = watch("zipCode");
  const billingCountry = watch("country");

  const sameAsBilling = watch("sameAsBilling");

  // When checkbox is checked, auto-copy billing values to shipping
  const handleSameAsBilling = (checked: boolean) => {
    setValue("sameAsBilling", checked);

    if (checked) {
      // copy billing → shipping
      setValue("shippingStreet", billingStreet);
      setValue("shippingCity", billingCity);
      setValue("shippingState", billingState);
      setValue("shippingZipCode", billingZip);
      setValue("shippingCountry", billingCountry);
    } else {
      // clear shipping fields
      setValue("shippingStreet", "");
      setValue("shippingCity", "");
      setValue("shippingState", "");
      setValue("shippingZipCode", "");
      setValue("shippingCountry", "");
    }
  };

  return (
    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-5 space-y-6">
      <h2 className="bg-[#eae6db] h-10 rounded-xl text-center font-bold p-2">Contact Information</h2>

      <form action={formAction} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              {...register("customerEmail", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Enter a valid email address",
                },
              })}
              type="email"
              className="w-full border rounded-md p-2"
              placeholder="Email Address"
            />
            {errors.customerEmail && (
              <p className="text-red-500 text-sm">{errors.customerEmail.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium">Phone number</label>
            <input
              {...register("customerPhone", {
                required: "Mobile number is required",
                minLength: {
                  value: 10,
                  message: "Mobile number must be at least 10 digits",
                },
              })}
              type="text"
              className="w-full rounded-md p-2"
              placeholder="Mobile number"
            />
            {errors.customerPhone && (
              <p>{errors.customerPhone.message}</p>
            )}
          </div>
          <div>
            <label className="text-sm font-medium">Full Name *</label>
            <input
              {...register("customerName", {
                required: "Name is required",
              })}
              type="text"
              className="w-full border rounded-md p-2"
              placeholder="Full Name"
            />
            {errors.customerName && (
              <p className="text-red-500 text-sm">{errors.customerName.message}</p>
            )}
          </div>
        </div>

        <h2 className="bg-[#eae6db] h-10 rounded-xl text-center font-bold p-2">Delivery Address</h2>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Street</label>
            <input
              {...register("street", {
                required: "Street is reuired"
              })}
              type="text"
              className="w-full border rounded-md p-2"
              placeholder="Street Address"
            />
            {errors.street && (
              <p className="text-red-500 text-sm">{errors.street.message}</p>
            )}
          </div>
          <div>
            <label className="text-sm font-medium">City</label>
            <input
              {...register("city", {
                required: "city is reuired"
              })}
              type="text"
              className="w-full border rounded-md p-2"
              placeholder="city"
            />
            {errors.city && (
              <p className="text-red-500 text-sm">{errors.city.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium">State</label>
            <input
              {...register("state", {
                required: "State is reuired"
              })}
              type="text"
              className="w-full border rounded-md p-2"
              placeholder="State"
            />
            {errors.state && (
              <p className="text-red-500 text-sm">{errors.state.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium">Zip code</label>
            <input
              {...register("zipCode", {
                required: "zip code is reuired"
              })}
              type="text"
              className="w-full border rounded-md p-2"
              placeholder="zip code"
            />
            {errors.zipCode && (
              <p className="text-red-500 text-sm">{errors.zipCode.message}</p>
            )}
          </div>
          <div>
            <label className="text-sm font-medium">Country *</label>
            <input
              {...register("country", { required: "Country is required" })}
              className="w-full border rounded-md p-2"
              placeholder="Country"
            />
            {errors.country && (
              <p className="text-red-500 text-sm">{errors.country.message}</p>
            )}
          </div>
        </div>

        <div>
          <input type="checkbox"
            {...register("sameAsBilling")}
            onChange={(e) => handleSameAsBilling(e.target.checked)} 
          />
          <label className="text-sm font-medium">
            Shipping address same as billing address
          </label>
        </div>

        {!sameAsBilling && (
          <>
            <h2 className="bg-[#eae6db] h-10 rounded-xl text-center font-bold p-2">
              Shipping Address
            </h2>

            <div className="space-y-4">
              <label className="text-sm font-medium">Shipping Street</label>
              <input
                {...register("shippingStreet")}
                className="w-full border rounded-md p-2"
                placeholder="Shipping Street"
              />
              
              <label className="text-sm font-medium">Shipping City</label>
              <input
                {...register("shippingCity")}
                className="w-full border rounded-md p-2"
                placeholder="Shipping City"
              />

              <label className="text-sm font-medium">Shipping State</label>
              <input
                {...register("shippingState")}
                className="w-full border rounded-md p-2"
                placeholder="Shipping State"
              />

              <label className="text-sm font-medium">Shipping Zip Code</label>
              <input
                {...register("shippingZipCode")}
                className="w-full border rounded-md p-2"
                placeholder="Shipping Zip"
              />

              <label className="text-sm font-medium">Shipping Country</label>
              <input
                {...register("shippingCountry")}
                className="w-full border rounded-md p-2"
                placeholder="Shipping Country"
              />
            </div>
          </>
        )}

        <button
          type="submit"
          className="bg-red-600 text-white px-6 py-3 rounded-full w-full font-semibold">
          {isPending ? "ordering..." : "Place Order"}
        </button>
        {state.error &&
          <p className="text-red-600">{state.error}</p>
        }
        {state.success &&
          <p className="text-green-600">{state.success}</p>
        }
      </form>
    </div>
  );
}