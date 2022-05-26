import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { MinusSmIcon, PlusSmIcon } from '@heroicons/react/outline';
import toast from 'react-hot-toast';

import { useStateContext } from '../../context/stateContext';
import { urlFor } from '../../lib/client';

import {
  CheckIcon,
  ClockIcon,
  QuestionMarkCircleIcon,
  XIcon,
} from '@heroicons/react/solid';

export default function Cart() {
  const cartRef = useRef();

  const { totalPrice, totalQuantities, cartItems, setShowCart } =
    useStateContext();

  if (typeof window !== 'undefined') {
    const cartProducts = JSON.parse(localStorage.getItem('cart'));
  }

  return (
    <div className="bg-white" ref={cartRef}>
      <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Shopping Cart
        </h1>
        <form className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>

            {/* DISPLAY CART ITEMS */}
            <ul
              role="list"
              className="border-t border-b border-gray-200 divide-y divide-gray-200"
            >
              {cartItems?.map((item) => (
                <li key={item._id} className="flex py-6 sm:py-10">
                  <div className="flex-shrink-0">
                    <img
                      src={urlFor(item?.image[0])}
                      alt="Image of product"
                      className="w-24 h-24 rounded-md object-center object-cover sm:w-48 sm:h-48"
                    />
                  </div>

                  <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div>
                        <div className="flex justify-between">
                          {/* <h3 className="text-sm">
                            <Link>
                              <a
                                href={item.href}
                                className="font-medium text-gray-700 hover:text-gray-800"
                              >
                                {item.name}
                              </a>
                            </Link>
                          </h3> */}
                        </div>
                        <p className="mt-1 text-sm font-medium text-gray-900">
                          {item.name}
                        </p>

                        <p className="mt-1 text-sm font-medium text-gray-900">
                          €{totalPrice}
                        </p>
                      </div>

                      <div className="flex mt-3 items-center">
                        <p className="mr-2">Quantity:</p>
                        <div className="border flex border-gray-500">
                          <div
                            className="p-2 border-r border-gray-500 cursor-pointer"
                            // onClick={}
                          >
                            <MinusSmIcon className="w-5 h-5" />
                          </div>
                          <div className="p-2 border-r border-gray-500">
                            {totalQuantities}
                          </div>
                          <div
                            className="p-2 border-r cursor-pointer"
                            // onClick={}
                          >
                            <PlusSmIcon className="w-5 h-5 " />
                          </div>
                        </div>
                      </div>
                      <p className="mt-4 flex text-sm text-gray-700 space-x-2">
                        <CheckIcon
                          className="flex-shrink-0 h-5 w-5 text-green-500"
                          aria-hidden="true"
                        />
                        <span>'In stock' </span>
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Order summary */}
          <section
            aria-labelledby="summary-heading"
            className="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5"
          >
            <h2
              id="summary-heading"
              className="text-lg font-medium text-gray-900"
            >
              Order summary
            </h2>

            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Subtotal</dt>
                <dd className="text-sm font-medium text-gray-900">
                  €{totalPrice}
                </dd>
              </div>
              <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                <dt className="flex items-center text-sm text-gray-600">
                  <span>Shipping estimate</span>
                  <a
                    href="#"
                    className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">
                      Learn more about how shipping is calculated
                    </span>
                    <QuestionMarkCircleIcon
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  </a>
                </dt>
                {totalPrice > 150 ? (
                  <dd className="text-sm font-medium text-gray-900">Free</dd>
                ) : (
                  <dd className="text-sm font-medium text-gray-900">€15.00</dd>
                )}
              </div>

              <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                <dt className="text-base font-medium text-gray-900">
                  Order total
                </dt>
                {totalPrice > 150 ? (
                  <dd className="text-sm font-medium text-gray-900">
                    €{totalPrice}
                  </dd>
                ) : (
                  <dd className="text-sm font-medium text-gray-900">
                    €{totalPrice + 15}
                  </dd>
                )}
              </div>
            </dl>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
              >
                Checkout
              </button>
            </div>
          </section>
        </form>
      </div>
    </div>
  );
}