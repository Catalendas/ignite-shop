import { ProductSkeletonContainer, SkeletonItem } from "./style";
import {ComponentProps} from "react"

type ProductSkeletonProps = ComponentProps<typeof ProductSkeletonContainer>

export function ProductSkeleton({...props}: ProductSkeletonProps) {
    return (
        <ProductSkeletonContainer {...props}>
            <SkeletonItem />
            <div>
                <SkeletonItem/>
                <SkeletonItem/>
            </div>
        </ProductSkeletonContainer>
    )
}