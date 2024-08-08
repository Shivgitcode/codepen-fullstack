import NavbarContent from "./NavbarContent";

export default function Navbar({ children }) {
    return (
        <div className="flex justify-start">
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
                        Open drawer
                    </label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                        <NavbarContent></NavbarContent>


                    </div>
                </div>
            </div>
            <div className=" min-w-full">
                {children}


            </div>
        </div>
    )
}
