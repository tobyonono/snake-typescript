import { TouchEvent, useState } from 'react'

interface SwipeInput {
    onSwipedLeft: () => void
    onSwipedRight: () => void
    onSwipedUp: () => void
    onSwipedDown: () => void
}

interface SwipeOutput {
    onTouchStart: (e: TouchEvent) => void
    onTouchMove: (e: TouchEvent) => void
    onTouchEnd: () => void
}

const MySwipe = (input: SwipeInput): SwipeOutput => {
    const minSwipeDistance = 50
    const [touchStart, setTouchStart] = useState<number>(0)
    const [touchEnd, setTouchEnd] = useState<number>(0)
    const [touchVertStart, setTouchVertStart] = useState<number>(0)
    const [touchVertEnd, setTouchVertEnd] = useState<number>(0)

    const onTouchStart = (e: TouchEvent) => {
        setTouchEnd(0)
        setTouchStart(e.targetTouches[0].clientX)

        setTouchVertEnd(0)
        setTouchVertStart(e.targetTouches[0].clientY)
    }

    const onTouchMove = (e: TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX)
        setTouchVertEnd(e.targetTouches[0].clientY)
    }

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return
        if (!touchVertStart || !touchVertEnd) return

        const distance = touchStart - touchEnd
        const isLeftSwipe = distance > minSwipeDistance
        const distanceVert = touchVertStart - touchVertEnd
        const isUpSwipe = distanceVert > minSwipeDistance
        if (Math.abs(touchStart - touchEnd) > Math.abs(touchVertStart - touchVertEnd)) {
            if (isLeftSwipe) {
                input.onSwipedLeft()
            } else {
                input.onSwipedRight()
            }
        } else {

            if (isUpSwipe) {
                input.onSwipedUp()
            } else {
                input.onSwipedDown()
            }
        }
    }

    return {
        onTouchStart,
        onTouchMove,
        onTouchEnd
    }
}

export default MySwipe
