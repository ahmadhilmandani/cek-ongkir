'use client'

import Image from "next/image";
import Input from "./components/Input";
import Dropdown from "./components/Dropdown";
import FillButton from "./components/FillButton";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  let [cities, setCities] = useState(null)
  let [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState({
    destination: 1,
    origin: 1,
    weight: 0,
    courier: 'jne',
  })

  const [ongkir, setOngkir] = useState(null)

  function handleFormDataDestination(e) {
    setFormData({ ...formData, destination: e.target.value })
  }

  function handleFormDataOrigin(e) {
    setFormData({ ...formData, origin: e.target.value })
  }

  function handleFormDataWeight(e) {
    setFormData({ ...formData, weight: e.target.value })
  }

  function handleFormDataCourier(e) {
    setFormData({ ...formData, courier: e.target.value })
  }

  function handleCekOngkir(e) {
    e.preventDefault()
    setIsLoading(true)

    axios.post('/api/cost',
      {
        destination: formData.destination,
        origin: formData.origin,
        weight: formData.weight,
        courier: formData.courier,
      },
      {
        headers: {
          key: process.env.NEXT_PUBLIC_RAJAONGKIR_API_KEY
        },
      }
    ).then((res) => {
      setOngkir(res.data.rajaongkir)
      console.log(res.data.rajaongkir)
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      setIsLoading(false)
    })
  }

  useEffect(() => {
    axios.get('/api/city',
      {
        headers: {
          key: process.env.NEXT_PUBLIC_RAJAONGKIR_API_KEY
        },
      }
    ).then((res) => {
      setCities(res.data.rajaongkir.results)
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      setIsLoading(false)
    })
  }, [])


  return (
    <>
      {isLoading === true ?
        <>
          <div className="min-h-screen flex justify-center items-center">
            loading!
          </div>
        </>
        :
        <>
          <div className="min-h-screen flex justify-center items-center py-14">
            <main className="max-w-[640px] w-full">
              <h1 className="text-center italic mb-8">CEKIR</h1>
              <form onSubmit={(e) => { handleCekOngkir(e) }}>
                <div className="flex justify-center gap-4 mt-4">
                  <div className="min-w-[160px] max-w-[320px] w-full">
                    <Input
                      labelProp={'Berat (Kg)'}
                      idProp={'tujuan'}
                      placeholderProp={'10 Kg'}
                      inputType={'number'}
                      inputVal={formData.weight}
                      handleOnInput={handleFormDataWeight}
                    />
                  </div>
                  <div className="min-w-[160px] max-w-[320px] w-full">
                    <Dropdown
                      labelProp="Kurir"
                      idProp="kurir"
                      handleOnInput={handleFormDataCourier}
                    >
                      <option value={'jne'}>JNE</option>
                      <option value={'pos'}>POS</option>
                      <option value={'tiki'}>TIKI</option>
                    </Dropdown>
                  </div>
                </div>
                <div className="flex justify-center gap-4 mt-4">
                  <div className="min-w-[160px] max-w-[320px] w-full">
                    <Dropdown
                      labelProp="Kota asal"
                      idProp="kota_asal"
                      handleOnInput={handleFormDataOrigin}
                    >
                      {cities.map((city) => {
                        return (
                          <>
                            <option value={city?.city_id}>{city?.city_name}</option>
                          </>
                        )
                      })}
                    </Dropdown>
                  </div>
                  <div className="min-w-[160px] max-w-[320px] w-full">
                    <Dropdown
                      labelProp="Kota tujuan"
                      idProp="kota_tujuan"
                      handleOnInput={handleFormDataDestination}
                    >
                      {cities.map((city) => {
                        return (
                          <>
                            <option value={city?.city_id}>{city?.city_name}</option>
                          </>
                        )
                      })}
                    </Dropdown>
                  </div>
                </div>
                <div className="mt-8">
                  <FillButton buttonStyle={'primary'}>
                    Cek
                  </FillButton>
                </div>
              </form>

              <section className="w-ful card mt-14">
                {
                  ongkir ?
                    <>
                      <h2 className="text-center mb-4">Ongkos Kirim</h2>
                      <div>
                        <div className="flex justify-between mb-4">
                          <div>
                            <small className="block text-neutral-500/80 mb-1">
                              Berat (Kg)
                            </small>
                            <div className="font-semibold">
                              {ongkir.query.weight}
                            </div>
                          </div>
                          <div className="text-right">
                            <small className="block text-neutral-500/80 mb-1 text-right">
                              Kurir
                            </small>
                            <div className="text-right font-semibold">
                              {ongkir.query.courier}
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between pb-2 border-b-2 border-sky-500">
                          <div>
                            <small className="block text-neutral-500/80 mb-1">
                              Asal
                            </small>
                            <div className="font-semibold">
                              {ongkir.origin_details.city_name}
                            </div>
                          </div>
                          <div className="text-right">
                            <small className="block text-neutral-500/80 mb-1 text-right">
                              Tujuan
                            </small>
                            <div className="text-right font-semibold">
                              {ongkir.destination_details.city_name}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="overflow-auto mt-8">
                        <table className="w-full">
                          <thead className="border-b border-cust-grey-lighter/80 bg-cust-grey-lightest">
                            <tr>
                              <th className="w-[120px] px-3 py-5 bg-neutral-200/70 rounded-l-md font-semibold tracking-wide text-left flex items-center">Layanan
                              </th>
                              <th className="w-[200px] px-3 py-5 bg-neutral-200/70 font-semibold tracking-wide text-left">Deskripsi</th>
                              <th className="w-[200px] px-3 py-5 bg-neutral-200/70 font-semibold tracking-wide text-left">Estimasi (hari)</th>
                              <th className="w-[120px] px-3 py-5 bg-neutral-200/70 font-semibold tracking-wide text-left flex items-center">Ongkir
                              </th>
                              <th className="px-3 py-5 bg-neutral-200/70 rounded-r-md font-semibold tracking-wide text-left">Note</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-cust-grey-lighter/80">
                            {ongkir.results[0].costs.map((cost) => {
                              return (
                                <>
                                  <tr>
                                    <td className="w-[120px] px-3 py-5">
                                      {cost.service}
                                    </td>
                                    <td className="w-[200px] px-3 py-5">
                                      {cost.description}
                                    </td>
                                    <td className="w-[200px] px-3 py-5">
                                      {cost.cost[0].etd ? cost.cost[0].etd : '-'}
                                    </td>
                                    <td className="w-[120px] px-3 py-5">
                                      {cost.cost[0].value}
                                    </td>
                                    <td className="px-3 py-5">
                                      {cost.cost[0].note ? cost.cost[0].note : '-'}
                                    </td>
                                  </tr>
                                </>
                              )
                            })}
                          </tbody>
                        </table>
                      </div>
                    </> :
                    <>
                      <small>Untuk mengecek ongkos kirim, tolong isi seluruh data diatas ⬆️ ya!✌️</small>
                    </>
                }
              </section>
            </main>
          </div>
        </>
      }
    </>
  )
}
