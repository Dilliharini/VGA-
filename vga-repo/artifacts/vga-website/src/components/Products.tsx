import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Check, ShoppingBasket, X } from "lucide-react";
import { useOrder } from "@/context/OrderContext";

interface Product {
  id: string;
  category: string;
  brand: string;
  name: string;
  description: string;
  unit: string;
}

const PRODUCTS: Product[] = [
  // Steel & Iron Products
  { id: "s1", category: "TMT Steel Bars", brand: "Tata Tiscon", name: "TMT Bar 8mm Fe 500D", description: "Earthquake resistant TMT bar — ideal for stirrups and ring binding.", unit: "kg" },
  { id: "s2", category: "TMT Steel Bars", brand: "JSW Steel", name: "TMT Bar 12mm Fe 500D", description: "High-strength Fe 500D TMT bars for RCC construction.", unit: "kg" },
  { id: "s3", category: "TMT Steel Bars", brand: "SAIL", name: "TMT Bar 16mm Fe 500", description: "Standard SAIL TMT bar for columns and slabs.", unit: "kg" },
  { id: "s4", category: "TMT Steel Bars", brand: "Tata Tiscon", name: "TMT Bar 20mm Fe 500D", description: "Heavy-duty bar for foundations and large structural members.", unit: "kg" },
  { id: "s5", category: "Structural Steel", brand: "SAIL", name: "ISMB 100×50 Beam", description: "Indian Standard Medium Beam — workshops & sheds.", unit: "kg" },
  { id: "s6", category: "Structural Steel", brand: "SAIL", name: "Steel Angle 50×50×5mm", description: "Equal angles for frameworks and bracing.", unit: "kg" },
  { id: "s7", category: "Structural Steel", brand: "SAIL", name: "Steel Channel 100mm", description: "ISMC channels for industrial structures.", unit: "kg" },
  { id: "s8", category: "Structural Steel", brand: "SAIL", name: "Steel Flat 50×6mm", description: "Mild steel flats for fabrication and gates.", unit: "kg" },
  { id: "s9", category: "MS Pipes", brand: "Surya Roshni", name: "MS ERW Pipe 1 inch", description: "Electric resistance welded pipe for plumbing and frameworks.", unit: "metre" },
  { id: "s10", category: "MS Pipes", brand: "Tata Steel", name: "MS Seamless Pipe 2 inch", description: "High-pressure seamless pipe for industrial use.", unit: "metre" },
  { id: "s11", category: "Steel Sheets", brand: "JSW Steel", name: "GI Sheet 0.45mm", description: "Galvanised iron sheet for roofing and cladding.", unit: "sheet" },
  { id: "s12", category: "Steel Sheets", brand: "Tata Bluescope", name: "Roofing Sheet (Color Coated)", description: "Pre-painted steel roofing sheet for industrial sheds.", unit: "sheet" },
  { id: "s13", category: "Steel Sheets", brand: "SAIL", name: "HR Steel Plate 6mm", description: "Hot rolled plate for fabrication and flooring.", unit: "kg" },
  { id: "s14", category: "GI Pipes", brand: "Tata Steel", name: "GI Pipe 0.5 inch (Medium)", description: "Galvanised iron pipe for water supply lines.", unit: "metre" },
  { id: "s15", category: "GI Pipes", brand: "Jindal", name: "GI Pipe 1 inch (Heavy)", description: "Heavy-duty GI pipe for overhead water systems.", unit: "metre" },

  // Cement & Construction
  { id: "c1", category: "Cement", brand: "UltraTech", name: "OPC 53 Grade Cement", description: "Ordinary Portland Cement — 50 kg bag.", unit: "bag" },
  { id: "c2", category: "Cement", brand: "Ramco", name: "PPC Cement — 50kg", description: "Portland Pozzolana Cement for general construction.", unit: "bag" },
  { id: "c3", category: "Cement", brand: "Birla White", name: "White Cement — 5kg", description: "Decorative and jointing applications.", unit: "bag" },
  { id: "c4", category: "Sand", brand: "Local Source", name: "River Sand — Plastering Grade", description: "Fine screened sand for wall plastering. Sold per unit (100 cft).", unit: "unit" },
  { id: "c5", category: "Sand", brand: "ISO Certified", name: "M Sand — Plastering", description: "Manufactured sand, IS 1542 compliant. Per unit (100 cft).", unit: "unit" },
  { id: "c6", category: "Sand", brand: "ISO Certified", name: "P Sand — Fine Grade", description: "Plaster sand with controlled grading. Per unit (100 cft).", unit: "unit" },
  { id: "c7", category: "Aggregates", brand: "Local Quarry", name: "Blue Metal 20mm", description: "Crushed granite aggregate for concrete mixing.", unit: "unit" },
  { id: "c8", category: "Aggregates", brand: "Local Quarry", name: "Jelly Stones 40mm", description: "Coarse aggregate for foundations and mass concrete.", unit: "unit" },
  { id: "c9", category: "Blocks & Bricks", brand: "Local", name: "Clay Bricks (Standard)", description: "Kiln-fired red bricks for walls and partitions.", unit: "1000 nos" },
  { id: "c10", category: "Blocks & Bricks", brand: "Siporex", name: "AAC Blocks 600×200×150mm", description: "Lightweight autoclaved aerated concrete blocks.", unit: "cubic metre" },

  // Paints
  { id: "p1", category: "Asian Paints", brand: "Asian Paints", name: "Apex Exterior Emulsion", description: "Weatherproof exterior emulsion with UV protection.", unit: "litre" },
  { id: "p2", category: "Asian Paints", brand: "Asian Paints", name: "Tractor Emulsion Interior", description: "Smooth, washable interior wall paint.", unit: "litre" },
  { id: "p3", category: "Asian Paints", brand: "Asian Paints", name: "SmartCare Damp Proof", description: "Waterproofing solution for terraces and wet areas.", unit: "litre" },
  { id: "p4", category: "Other Paints", brand: "Berger", name: "WeatherCoat All Guard", description: "All-weather exterior paint with anti-fungal properties.", unit: "litre" },
  { id: "p5", category: "Other Paints", brand: "Nerolac", name: "Impressions HD Interior", description: "Premium interior paint with high definition finish.", unit: "litre" },
  { id: "p6", category: "Other Paints", brand: "Asian Paints", name: "Wall Putty — 20kg", description: "White cement-based wall putty for smooth base.", unit: "bag" },

  // Hardware
  { id: "h1", category: "Hardware Materials", brand: "Bosch", name: "Cutting Disc 4 inch", description: "Abrasive cutting disc for MS and SS cutting.", unit: "nos" },
  { id: "h2", category: "Hardware Materials", brand: "GI", name: "Binding Wire 18 SWG", description: "Annealed binding wire for tying TMT bars.", unit: "kg" },
  { id: "h3", category: "Hardware Materials", brand: "Hilti", name: "Anchor Bolts M12", description: "Chemical anchor bolts for concrete fastening.", unit: "nos" },
  { id: "h4", category: "Hardware Materials", brand: "Standard", name: "Nails Assorted Pack", description: "Wire nails in assorted sizes for carpentry.", unit: "kg" },
  { id: "h5", category: "Hardware Materials", brand: "Godrej", name: "Tower Bolt 6 inch", description: "Heavy-duty MS tower bolt with CP finish.", unit: "nos" },

  // Plumbing
  { id: "pl1", category: "Plumbing Supplies", brand: "Finolex", name: "PVC Pipe 1 inch (Class 4)", description: "Rigid PVC pipe for water supply.", unit: "metre" },
  { id: "pl2", category: "Plumbing Supplies", brand: "Supreme", name: "CPVC Pipe 0.75 inch", description: "Hot & cold water supply pipe, IS 15778 compliant.", unit: "metre" },
  { id: "pl3", category: "Plumbing Supplies", brand: "Sintex", name: "Water Tank 500L", description: "Triple-layer insulated overhead storage tank.", unit: "nos" },
  { id: "pl4", category: "Plumbing Supplies", brand: "Jaquar", name: "Ball Valve 1 inch", description: "Brass ball valve for mainline shutoff.", unit: "nos" },

  // Electrical
  { id: "e1", category: "Electrical Materials", brand: "Finolex", name: "FR Wire 1.5 sq.mm", description: "Flame retardant copper wire for house wiring.", unit: "metre" },
  { id: "e2", category: "Electrical Materials", brand: "Havells", name: "MCB 32A Single Pole", description: "Miniature circuit breaker for circuit protection.", unit: "nos" },
  { id: "e3", category: "Electrical Materials", brand: "Anchor", name: "Modular Switch 6A", description: "Flush-mount modular switch with indicator.", unit: "nos" },
  { id: "e4", category: "Electrical Materials", brand: "Philips", name: "LED Batten 20W", description: "Energy-efficient LED batten for site lighting.", unit: "nos" },

  // Tools
  { id: "t1", category: "Construction Tools", brand: "Bosch", name: "Rotary Drill 13mm", description: "Heavy-duty electric drill for masonry and steel.", unit: "nos" },
  { id: "t2", category: "Construction Tools", brand: "Stanley", name: "Hand Tool Kit", description: "Essential site hand tool set — hammers, pliers, spanners.", unit: "set" },
  { id: "t3", category: "Construction Tools", brand: "Generic", name: "Wheel Barrow (Steel)", description: "Heavy-duty steel barrow for material handling on site.", unit: "nos" },
  { id: "t4", category: "Construction Tools", brand: "Karam", name: "Safety Helmet (IS Certified)", description: "IS 2925 certified hard hat for site safety.", unit: "nos" },
];

const CATEGORIES = [
  { label: "All", value: "All" },
  { label: "TMT Steel Bars", value: "TMT Steel Bars" },
  { label: "Structural Steel", value: "Structural Steel" },
  { label: "MS Pipes", value: "MS Pipes" },
  { label: "Steel Sheets", value: "Steel Sheets" },
  { label: "GI Pipes", value: "GI Pipes" },
  { label: "Cement", value: "Cement" },
  { label: "Sand", value: "Sand" },
  { label: "Aggregates", value: "Aggregates" },
  { label: "Blocks & Bricks", value: "Blocks & Bricks" },
  { label: "Asian Paints", value: "Asian Paints" },
  { label: "Other Paints", value: "Other Paints" },
  { label: "Hardware Materials", value: "Hardware Materials" },
  { label: "Plumbing Supplies", value: "Plumbing Supplies" },
  { label: "Electrical Materials", value: "Electrical Materials" },
  { label: "Construction Tools", value: "Construction Tools" },
];

const CATEGORY_GRID = [
  { label: "TMT Steel Bars", icon: "🔩", desc: "High-strength Fe 500D / Fe 500D TMT bars for RCC construction." },
  { label: "Structural Steel", icon: "🏗️", desc: "Beams, channels, angles and joists for industrial structures." },
  { label: "MS Pipes", icon: "⚙️", desc: "Mild steel pipes — ERW, seamless, galvanised." },
  { label: "Steel Sheets", icon: "📄", desc: "GI, GP, CR and HR sheets, plates and roofing." },
  { label: "Cement", icon: "🏛️", desc: "OPC 43, OPC 53 and PPC from leading brands." },
  { label: "Sand", icon: "🏖️", desc: "River sand and M-Sand — plastering & concrete grade." },
  { label: "Asian Paints", icon: "🎨", desc: "Interior, exterior, primers and waterproofing range." },
  { label: "Hardware Materials", icon: "🔧", desc: "Binding wire, nails, fasteners, bolts and site essentials." },
  { label: "Plumbing Supplies", icon: "🚿", desc: "PVC, CPVC pipes, tanks, valves and fittings." },
  { label: "Electrical Materials", icon: "⚡", desc: "Wires, MCBs, switches and LED lighting." },
];

function ProductCard({ product }: { product: Product }) {
  const { items, addItem, removeItem } = useOrder();
  const added = items.some((i) => i.id === product.id);

  function toggle() {
    if (added) {
      removeItem(product.id);
    } else {
      addItem({
        id: product.id,
        category: product.category,
        brand: product.brand,
        name: product.name,
        unit: product.unit,
      });
    }
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
      className={`bg-card border rounded-2xl p-5 flex flex-col gap-3 transition-shadow duration-200 hover:shadow-md ${
        added ? "border-primary/30 bg-primary/3" : "border-border"
      }`}
    >
      <div>
        <span className="text-xs text-primary font-medium">{product.brand}</span>
        <h3 className="text-base font-semibold text-foreground mt-0.5">{product.name}</h3>
        <p className="text-sm text-muted-foreground font-light leading-relaxed mt-1.5">
          {product.description}
        </p>
      </div>
      <div className="flex items-center justify-between mt-auto pt-2 border-t border-border">
        <span className="text-xs text-muted-foreground">
          Sold per <span className="font-medium text-foreground">{product.unit}</span>
        </span>
        <button
          data-testid={`button-add-${product.id}`}
          onClick={toggle}
          className={`flex items-center gap-1.5 text-sm font-medium rounded-full px-4 py-1.5 transition-all duration-200 ${
            added
              ? "bg-primary text-primary-foreground"
              : "bg-primary/8 text-primary hover:bg-primary hover:text-primary-foreground"
          }`}
        >
          {added ? <Check size={14} /> : <Plus size={14} />}
          {added ? "Added" : "Add to Order"}
        </button>
      </div>
    </motion.div>
  );
}

export function Products() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [activeCategory, setActiveCategory] = useState("All");
  const { items, totalCount } = useOrder();

  const filtered =
    activeCategory === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

  function scrollToEnquiry() {
    document.getElementById("enquiry")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section id="products" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-2">
            Product Categories
          </p>
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-foreground">
              Everything your site needs
            </h2>
            <button
              onClick={() => setView("list")}
              className="text-sm text-primary font-medium hover:underline shrink-0"
            >
              View all →
            </button>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {view === "grid" ? (
            /* ── Category Grid View ── */
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"
            >
              {CATEGORY_GRID.map((cat, i) => (
                <motion.button
                  key={cat.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  onClick={() => { setActiveCategory(cat.label); setView("list"); }}
                  className="bg-card border border-border rounded-2xl p-5 text-left hover:shadow-md hover:border-primary/20 transition-all duration-200 group"
                >
                  <span className="text-2xl mb-3 block">{cat.icon}</span>
                  <h3 className="text-sm font-semibold text-foreground mb-1.5">{cat.label}</h3>
                  <p className="text-xs text-muted-foreground font-light leading-relaxed">{cat.desc}</p>
                </motion.button>
              ))}
            </motion.div>
          ) : (
            /* ── Product List View ── */
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {/* Back + Filter Tabs */}
              <div className="mb-6">
                <button
                  onClick={() => setView("grid")}
                  className="text-sm text-muted-foreground hover:text-foreground mb-4 flex items-center gap-1"
                >
                  ← Back to categories
                </button>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => setActiveCategory(cat.value)}
                      className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        activeCategory === cat.value
                          ? "bg-foreground text-background"
                          : "bg-accent/50 text-muted-foreground hover:bg-accent"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Products Grid */}
              <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <AnimatePresence>
                  {filtered.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Order Basket */}
        <AnimatePresence>
          {totalCount > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              className="fixed bottom-24 right-6 z-40"
            >
              <button
                onClick={scrollToEnquiry}
                data-testid="button-view-order"
                className="flex items-center gap-3 bg-foreground text-background rounded-full px-5 py-3 shadow-xl hover:shadow-2xl transition-all duration-200"
              >
                <ShoppingBasket size={18} />
                <span className="text-sm font-medium">
                  {totalCount} item{totalCount > 1 ? "s" : ""} in order
                </span>
                <span className="bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {totalCount}
                </span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
