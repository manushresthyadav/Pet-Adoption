import './Adopt.css'
export default function useAdopt(){
    return(
        <div className="adopt__container w-full flex-col">
            <div className="adopt__navbar font-bold text-2xl items-center justify-center">
                <ul className="flex list-none gap-x-14 ">
                    <li><a href='/ui'>Home</a></li>
                    <li><a href='/partner'>Sell Your Pet</a></li>
                    <li><a href='/donate'>Donate us</a></li>
                    <li><a href='/contact'>Contact Us</a></li>
                </ul>
            </div>
            
        </div>
    )
}