import React from "react";

const PaymentIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3.33301 16.2665V7.44024C3.33301 5.0616189 3.33301 3.87273 4.06524 3.13388C4.79747 2.39502 5.97598 2.39502 8.33301 2.39502H11.6663C14.0233 2.39502 15.2018 2.39502 15.9341 3.13388C16.6663 3.87273 16.6663 5.06189 16.6663 7.44024V16.2665C16.6663 17.5263 16.6663 18.1561 16.2813 18.404C15.6523 18.8093 14.6798 17.9595 14.1906 17.6511C13.7864 17.3962 13.5844 17.2688 13.3601 17.2614C13.1178 17.2534 12.9121 17.3757 12.4754 17.6511L10.883 18.6554C10.4534 18.9262 10.2387 19.0617 9.99967 19.0617C9.76067 19.0617 9.54592 18.9262 9.11634 18.6554L7.52395 17.6511C7.1198 17.3962 6.91772 17.2688 6.69345 17.2614C6.45111 17.2534 6.24545 17.3757 5.80873 17.6511C5.31963 17.9595 4.34707 18.8093 3.71797 18.404C3.33301 18.1561 3.33301 17.5263 3.33301 16.2665Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.16699 9.89502H6.66699"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.667 6.56201H6.66699"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default PaymentIcon;
