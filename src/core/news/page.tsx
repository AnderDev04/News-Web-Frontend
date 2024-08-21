import TemplateLayout from "../layout";
import ListNews from "./components/ListNews";

export default function HomePage() {
  return (
    <TemplateLayout>
      <div className="bg-yellow-500/80 w-full flex justify-center h-28 items-center text-3xl font-thin">
          El Comercio News
      </div>
      <div className="flex justify-center">
      <ListNews/>
      </div>
    </TemplateLayout>
  )
}
