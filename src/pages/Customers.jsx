import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { customers } from "@/dummy-data/customers";
import { ChevronLeft, ChevronRight, EllipsisVertical, Mars, Plus, Search, Venus } from "lucide-react";
import React from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router";

const Customers = () => {
  const [searchCustomer, setSearchCustomer] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(0);

  const filteredCustomers = customers.filter(customer => {
    const searchTerm = searchCustomer.toLowerCase();
    return (
      customer.label.toLowerCase().includes(searchTerm) ||
      customer.email.toLowerCase().includes(searchTerm) ||
      customer.phone.toLowerCase().includes(searchTerm) ||
      customer.address.toLowerCase().includes(searchTerm) ||
      customer.gender.toLowerCase().includes(searchTerm) ||
      customer.birthdate.toLowerCase().includes(searchTerm)
    )
  })

  const totalPages = Math.ceil(filteredCustomers.length / 6)

  const paginate = ({ selected }) => {
    setCurrentPage(selected)
  };

  React.useEffect(() => {
    setCurrentPage(0);
  }, [searchCustomer])

  const start = currentPage * 6;
  const end = start + 6;
  const currentCustomers = filteredCustomers.slice(start, end);

  return (
    <section className="py-5 px-5 h-full bg-[#F6F6F6]">
      <h1 className="text-2xl font-medium mb-4">Customer List</h1>
      <div className="flex justify-between items-end">
        <div className="flex gap-4 items-end">
          <div className="flex flex-col">
            <p className="text-sm text-gray-500">Search Customer</p>
            <div className="relative">
              <Input
                placeholder="Search by name, email, etc"
                className="bg-background min-w-53"
                value={searchCustomer}
                onChange={(e) => setSearchCustomer(e.target.value)}
              />
              <Search className="size-4 absolute top-1/2 right-1 -translate-1/2" />
            </div>
          </div>
        </div>
        <Link to={"new-customer"}>
          <Button variant="green">
            <Plus />
            Add New Customer
          </Button>
        </Link>
      </div>
      <div className="mt-3 grid grid-cols-[repeat(auto-fit,minmax(230px,310px))] gap-8">
        {customers.length || filteredCustomers ? (
          currentCustomers.map((customer) => {
            const gender = customer.gender === 'Male' ? "boy" : "girl"

            return (<div className="h-40 max-w-[310px] bg-background p-2 rounded-sm" key={customer.id}>
              <div className="flex items-center gap-4 relative">
                <Avatar className="size-11 rounded-sm">
                  <AvatarImage
                    src={`https://avatar.iran.liara.run/public/${gender}?username=${customer.label}`}
                    alt="profile pic"
                  />
                </Avatar>
                <div className="flex flex-col gap-2 h-full">
                  <h1 className="text-[16px] leading-none">{customer.label}</h1>
                  <span className={`flex items-center gap-2 ${customer.gender==='Male' ? "bg-blue-200 text-blue-600" : "bg-pink-200 text-pink-600"} w-fit px-2 py-0.5 rounded-sm text-xs`}>
                   {customer.gender === 'male' ? 
                    <Mars className="h-4 w-4 text-current" /> : 
                    <Venus className="h-4 w-4 text-current" />  
                  }
                    {customer.gender}
                  </span>
                </div>
                <EllipsisVertical className="size-4 absolute top-0 right-0 text-gray-500" />
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <span className="flex flex-col leading-none">
                  <p className="text-gray-500 text-xs">Phone</p>
                  <p className="text-sm">{customer.phone}</p>
                </span>
                <span className="flex flex-col leading-none">
                  <p className="text-gray-500 text-xs">Email</p>
                  <p className="text-sm">{customer.email}</p>
                </span>
                <span className="flex flex-col leading-none">
                  <p className="text-gray-500 text-xs">Address</p>
                  <p className="text-sm">{customer.address}</p>
                </span>
                <span className="flex flex-col leading-none">
                  <p className="text-gray-500 text-xs">Birthdate</p>
                  <p className="text-sm">{customer.birthdate}</p>
                </span>
              </div>
            </div>
          )})
        ) : (
          <div className="grid place-items-center w-full h-50 text-gray-500">
            No customers found
          </div>
        )}
      </div>
      <div className="flex justify-end">
        <ReactPaginate
          previousLabel={<ChevronLeft />}
          nextLabel={<ChevronRight />}
          breakLabel={"..."}
          pageCount={totalPages}
          onPageChange={paginate}
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          className="flex gap-2 mt-4"
          activeClassName="!bg-blue-500 grid place-items-center !text-white leading-none rounded-sm w-6 aspect-square transition"
          pageClassName="hover:bg-gray-200 grid place-items-center leading-none rounded-sm w-6 aspect-square cursor-pointer text-lg font-medium transition"
          previousClassName="hover:bg-gray-200 grid place-items-center leading-none rounded-sm w-6 aspect-square cursor-pointer text-lg font-medium transition"
          nextClassName="hover:bg-gray-200 grid place-items-center leading-none rounded-sm w-6 aspect-square cursor-pointer text-lg font-medium transition"
          disabledClassName="!opacity-50 !cursor-not-allowed"
          renderOnZeroPageCount={null}
        />
      </div>
    </section>
  );
};

export default Customers;
