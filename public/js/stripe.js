// import axios from 'axios';
// export const bookTour = async (tourId) => {
//   // try {
//   const stripe = await Stripe(`${process.env.STRIPE_TEST_API_PUBLIC_KEY}`);
//   //1) get checkout session from the API
//   const session = await axios(`/api/v1/bookings/checkout/${tourId}`);
//   console.log(session);
//   //2) Create checkout form + charge credit card

//   await fetch(`/api/v1/bookings/checkout/${tourId}`, {
//     method: 'POST',
//   })
//     .then(function (response) {
//       console.log(response);
//       return response.json();
//     })
//     .then(function (session) {
//       console.log(session);
//       return stripe.redirectToCheckout({ sessionId: session.session.id });
//     })
//     .then(function (result) {
//       // If `redirectToCheckout` fails due to a browser or network
//       // error, you should display the localized error message to your
//       // customer using `error.message`.
//       if (result.error) {
//         alert(result.error.message);
//       }
//     });
//   // } catch (err) {
//   //   console.log(err);
//   //   showAlert('error', err);
//   // }
// };

import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51KDo2DJPeCW8FmdCCnhNmoyEZCxJEEBOKbrlC5BoQMvk5budACOfbuqIadedtd0oqzKTnBepOJmoi42vwEkSJIDM00isAosCu2'
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    console.log(session);

    // 2) Create checkout form + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
