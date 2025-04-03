import { FocusCards } from "@/app/components/ui/focus-cards";

export function SolutionsPageCards() {
  const cards = [
    {
      title: "Plastic Waste Reduction",
      author: "",
      src: "/recycle.avif",
      description:
        "Plastic waste is a major environmental issue, as it pollutes oceans, harms wildlife, and contributes to climate change. Plastic waste reduction focuses on minimizing plastic use, improving recycling systems, and promoting alternatives like biodegradable materials. Key strategies include:",
      description1: (
        <ul>
          <li>
            <strong>Reduce:</strong> Using less plastic by opting for reusable
            bags, bottles, and packaging.
          </li>
          <li>
            <strong>Reuse:</strong> Finding second-life uses for plastic
            products.
          </li>
          <li>
            <strong>Recycle:</strong> Properly sorting and recycling plastic
            waste.
          </li>
          <li>
            <strong>Innovate:</strong> Developing alternatives like bioplastics
            or packaging-free products.
          </li>
          <li>
            <strong>Policy Support:</strong> Implementing bans on single-use
            plastics and promoting producer responsibility programs.
          </li>
        </ul>
      ),
    },
    {
      title: "Food Waste Recovery",
      author: "",
      src: "/fertilizer.avif",
      description:
        "Food waste is a global problem, leading to wasted resources (water, land, and energy) and increased greenhouse gas emissions. Food waste recovery aims to reduce food waste and redirect surplus food to those in need. Key approaches include:",
      description1: (
        <ul>
          <li>
            <strong>Source Reduction:</strong> Preventing food waste by
            improving inventory management, portion control, and food storage.
          </li>
          <li>
            <strong>Food Redistribution:</strong> Donating surplus food to food
            banks and charities instead of discarding it.
          </li>
          <li>
            <strong>Composting & Animal Feed:</strong> Converting food waste
            into compost or using it as livestock feed.
          </li>
          <li>
            <strong>Anaerobic Digestion:</strong> Breaking down food waste to
            produce biogas and biofertilizers.
          </li>
          <li>
            <strong>Consumer Education:</strong> Raising awareness about food
            expiration dates, meal planning, and storage techniques.
          </li>
        </ul>
      ),
    },
    {
      title: "Waste-to-Energy",
      author: "",
      src: "/landfill.avif",
      description:
        "Waste-to-Energy refers to converting non-recyclable waste materials into usable forms of energy, such as electricity, heat, or biofuels. This helps reduce landfill waste while producing renewable energy. Key methods include:",
      description1: (
        <ul>
          <li>
            <strong>Incineration:</strong> Burning waste to generate steam for
            electricity.
          </li>
          <li>
            <strong>Gasification:</strong> Heating waste in low-oxygen
            conditions to produce syngas for energy.
          </li>
          <li>
            <strong>Anaerobic Digestion:</strong> Breaking down organic waste to
            create biogas.
          </li>
          <li>
            <strong>Pyrolysis:</strong> Decomposing waste using heat to produce
            bio-oil or syngas.
          </li>
          <li>
            <strong>Landfill Gas Recovery:</strong> Capturing methane from
            decomposing waste in landfills for energy use.
          </li>
        </ul>
      ),
    },
    {
      title: "Disaster Risk Resilience",
      author: "",
      src: "/housing.avif",
      description:
        "Disaster risk resilience refers to the ability of communities, infrastructure, and systems to withstand, adapt to, and recover from disasters such as floods, earthquakes, wildfires, and storms. Key elements include:",
      description1: (
        <ul>
          <li>
            <strong>Risk Assessment:</strong> Identifying hazards and
            vulnerabilities in a community.
          </li>
          <li>
            <strong>Early Warning Systems:</strong> Using technology to detect
            and warn about disasters before they occur.
          </li>
          <li>
            <strong>Infrastructure Adaptation:</strong> Building
            earthquake-resistant buildings, flood defenses, and resilient power
            grids.
          </li>
          <li>
            <strong>Community Preparedness:</strong> Educating people on
            evacuation plans and emergency response.
          </li>
          <li>
            <strong>Ecosystem-Based Solutions:</strong> Using nature, such as
            mangroves and wetlands, to buffer against climate-related disasters.
          </li>
        </ul>
      ),
    },
    {
      title: "Renewable Energy",
      author: "",
      src: "/dam.avif",
      description:
        "Renewable energy comes from naturally replenished sources that have a lower environmental impact compared to fossil fuels. Major types include:",
      description1: (
        <ul>
          <li>
            <strong>Solar Energy:</strong> Using sunlight to generate
            electricity via solar panels.
          </li>
          <li>
            <strong>Wind Energy:</strong> Harnessing wind power through turbines
            to generate electricity.
          </li>
          <li>
            <strong>Hydropower:</strong> Using flowing water to produce energy,
            typically from dams.
          </li>
          <li>
            <strong>Geothermal Energy:</strong> Extracting heat from the
            Earth&apos;s interior for power and heating.
          </li>
          <li>
            <strong>Biomass Energy:</strong> Converting organic materials into
            energy sources like biofuels.
          </li>
        </ul>
      ),
    },
  ];

  return <FocusCards cards={cards} />;
}
