import { Outlet } from "react-router-dom";

const OrderLayout = () => {
  return (
    <>
      <div className="main" >
          <div className="main__content">
                <Outlet/>
          </div>
      </div>
    </>
  )
}

export default OrderLayout;