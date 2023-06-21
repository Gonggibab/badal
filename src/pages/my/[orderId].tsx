import { useRouter } from "next/router";

export default function OrderInformation() {
  const router = useRouter();
  const userId = router.query.orderId;

  return <div>{userId}</div>;
}
