import NewOrder from "@/features/NewOrder";
import React, { Suspense } from "react";

function NewOrderPage() {
  return (
    <Suspense>
      <NewOrder />
    </Suspense>
  );
}

export default NewOrderPage;
