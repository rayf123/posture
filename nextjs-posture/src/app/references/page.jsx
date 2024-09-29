import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  
import Header from "../components/Header";
import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <><Header/>
    <div className="p-3 bg-black text-white h-screen">
        <div className='flex flex-row gap-2 pb-5 items-center underline '>
            <p className="text-4xl lg:text-7xl">References</p>
            <Image src="/ref_white.png" width={60}  height={40} alt="" className='' />
            <p>Learn why posture is so important for your health.</p>
          </div>

        <div>
        <Accordion type="single" collapsible className="bg-black text-white">
            

        <AccordionItem value="item-1" className="border border-gray-400 px-1">
            <AccordionTrigger>Ergonomics and Cardiovascular Health</AccordionTrigger>
            <AccordionContent>
                A 2019 study from the International Journal of Environmental Research and Public Health found that prolonged sitting increases the risk of cardiovascular disease, type 2 diabetes, and overall mortality. Implementing good posture and ergonomic practices can help mitigate these risks.  
                <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10185389/" target="_blank" className="text-blue-500  hover:underline hover:font-semibold" rel="noopener noreferrer">
                Read more
                </a>
            </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border border-gray-400 px-1">
            <AccordionTrigger>Benefits of Ergonomic Chairs</AccordionTrigger>
            <AccordionContent>
                Research published in 2018 demonstrated that ergonomic chairs and short walking breaks improve vascular function and reduce fatigue in office workers, highlighting the importance of investing in proper ergonomic seating.
                <a href="https://risedesk.io/blogs/blog/7-health-benefits-of-ergonomic-chairs" target="_blank"  className="text-blue-500  hover:underline hover:font-semibold" rel="noopener noreferrer">
                Read more
                </a>
            </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border border-gray-400 px-1">
            <AccordionTrigger>Reducing Occupational Sitting Time</AccordionTrigger>
            <AccordionContent>
                A 2017 systematic review emphasized that reducing sitting time at work can alleviate musculoskeletal symptoms and boost work performance. Sit-stand desks are effective tools for promoting healthier posture and movement.
                <a href="https://spinehealth.org/article/spine-posture-workplace-ergonomics/" target="_blank"  className="text-blue-500  hover:underline hover:font-semibold" rel="noopener noreferrer">
                Read more
                </a>
            </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border border-gray-400 px-1">
            <AccordionTrigger>Sit-Stand Desks and Back Pain</AccordionTrigger>
            <AccordionContent>
                A 2015 study found that using sit-stand desks reduces upper back and neck pain by 54%, making it a valuable ergonomic solution for reducing discomfort caused by prolonged sitting.
                <a href="https://www.ccohs.ca/oshanswers/ergonomics/sitting/sitting_overview.html" target="_blank"  className="text-blue-500  hover:underline hover:font-semibold" rel="noopener noreferrer">
                Read more
                </a>
            </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border border-gray-400 px-1">
            <AccordionTrigger>Dangers of Poor Sitting Posture</AccordionTrigger>
            <AccordionContent>
                Research from 2014 highlighted that prolonged poor posture while sitting increases the risk of cancers like colon, breast, and endometrial cancer. Incorporating movement and posture corrections can significantly reduce health risks.
                <a href="https://www.ccohs.ca/oshanswers/ergonomics/sitting/sitting_poor.html" target="_blank"  className="text-blue-500  hover:underline hover:font-semibold" rel="noopener noreferrer">
                Read more
                </a>
            </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-6" className="border border-gray-400 px-1">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                    <AccordionContent>
                        Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
            </AccordionItem>

        </Accordion>
        </div>
        <div>
            <Link href="/pose">
                <p className="text-3xl underline p-3">Back</p>
          </Link>
        </div>
    </div>
    </>
  );
}
