import Link,{ LinkProps } from "next/link";
import { useRouter } from "next/router"; 
import { ReactElement, cloneElement} from "react"

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  href: string;
}

function ActiveLink({ children, href}: ActiveLinkProps) {

    return (
        <Link href="/">
          {children}
        </Link>
      )


}

export default ActiveLink