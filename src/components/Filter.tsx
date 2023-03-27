interface Props {
  filter: {province: string[], price: boolean, show: string, status: boolean}
  lifted: (newFilter: {
    province: string[];
    status: boolean;
    price: boolean;
    show: string;
  }) => void
}

const HouseFilter = ({filter, lifted}: Props) => {
  function helper(province: string) {
    const newProvinceList = filter.province.includes(province)
    ? filter.province.filter((p) => p !== province)
    : [...filter.province, province];

    const newFilter = { ...filter, province: newProvinceList };
    lifted(newFilter)
  }
  return (
  <div className="w-[275px] mb-8 sm:mb-0 sm:w-full flex h-full flex-col gap-4 text-white">
    <p>Sort by Province</p>
    <div>
      <input
        className="mr-2"
        type="checkbox"
        id="Cyrodiil"
        name="Cyrodiil"
        value="Cyrodiil"
        onChange={() => {
          helper("Cyrodiil")
        }}
      />
      <label htmlFor="Cyrodiil">Cyrodiil</label>
    </div>
    <div>
      <input
        className="mr-2"
        type="checkbox"
        id="Skyrim"
        name="Skyrim"
        value="Skyrim"
        onChange={() => {
          helper("Skyrim")
        }}
      />
      <label htmlFor="Skyrim">Skyrim</label>
    </div>
    <p>Status</p>
    <div>
      <input
        className="mr-2"
        type="checkbox"
        id="Sellable"
        name="Sellable"
        value="Sellable"
        onChange={() => lifted({...filter, status: !filter.status})}
      />
      <label htmlFor="Sellable">Available</label>
    </div>
    <p>Sort by</p>
    <select onChange={() => lifted({...filter, price: !filter.price})} className="mr-2 text-black" name="Price" id="Price">
      <option value="priceAsc">Price (asc)</option>
      <option value="priceDesc">Price (desc)</option>
    </select>
    <p>Show</p>
    <select className="mr-2 text-black" name="Show" id="Show"   onChange={(event) =>
    lifted({ ...filter, show: event.target.value })
  }>
      <option value="upfront">Upfront Cost</option>
      <option value="upgrade">Upgrade Cost</option>
      <option value="total">Total Cost</option>
    </select>
  </div>
  )
};

export default HouseFilter;
