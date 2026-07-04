import { motion } from "framer-motion";
import img1 from "@assets/Screenshot_2026-06-29_175254_1782735988536.png";
import img2 from "@assets/Screenshot_2026-06-29_175313_1782735988537.png";
import img3 from "@assets/Screenshot_2026-06-29_175324_1782735988537.png";
import img4 from "@assets/Screenshot_2026-06-29_175339_1782735988538.png";
import img5 from "@assets/Screenshot_2026-06-29_175353_1782735988539.png";
import img6 from "@assets/Screenshot_2026-06-29_175405_1782735988540.png";
import img7 from "@assets/Screenshot_2026-06-29_175418_1782735988541.png";
import img8 from "@assets/Screenshot_2026-06-29_175431_1782735988542.png";

const projects = [
  { src: img1, label: "Industrial Warehouses", span: "md:col-span-2 md:row-span-2" },
  { src: img2, label: "Steel Frameworks", span: "md:col-span-1 md:row-span-1" },
  { src: img3, label: "Commercial Builds", span: "md:col-span-1 md:row-span-1" },
  { src: img4, label: "Wide Span Structures", span: "md:col-span-2 md:row-span-1" },
  { src: img5, label: "Structural Installations", span: "md:col-span-1 md:row-span-2" },
  { src: img6, label: "Factory Complexes", span: "md:col-span-1 md:row-span-1" },
  { src: img7, label: "Night Operations", span: "md:col-span-1 md:row-span-1" },
  { src: img8, label: "Heavy Lifting", span: "md:col-span-1 md:row-span-1" },
];

export function Gallery() {
  return (
    <section id="gallery" className="py-24 bg-foreground text-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-serif font-medium mb-4 text-background">Our Work</h2>
            <p className="text-muted-foreground text-lg font-light">
              We take pride in supplying the bones of industry. From vast warehouses to intricate steel structures, our materials form the foundation of Chennai's growth.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[250px] gap-4">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative overflow-hidden rounded-xl group bg-muted ${project.span}`}
            >
              <img 
                src={project.src} 
                alt={project.label} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                <span className="text-white font-medium tracking-wide">
                  {project.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}