import { footerLinks } from "../constants"

export default function Footer(): JSX.Element {
    return(
        <footer className='py-5 sm:px-10 px-5'>
            <div className='screen-max-width'>
                <div>
                    <p className='font-semibold text-gray text-xs'>
                        More ways to shop: {' '}
                        <span className='underline text-line'>
                            Find an Apple Store {' '}
                        </span>
                        or {' '}
                        <span className='underline text-blue'>
                            other retailer 
                        </span>
                        near you.
                    </p>
                    <p className='font-semibold text-gray text-sm'>
                        Or call 0000800-692-7753.
                    </p>
                </div>
                <div className='bg-neutral-700 my-5 h-[1px] w-full'>
                    <div className='flex md:flex-row flex-col md:items-center justify-between'>
                        <p className="font-semibold text-gray text-xs">Copright @ 2024 Apple Inc. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}