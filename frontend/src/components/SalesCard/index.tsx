import axios from "axios";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import NotificationButton from "../NotificationButton";
import { BASE_URL } from '../../utils/request';
import { Sale } from "../../models/sale";
import "./style.css";

function SalesCard() {

    const initialDate = new Date(new Date().setDate(new Date().getDate() - 365));
    const presentDate = new Date();

    const [minDate, setMinDate] = useState(initialDate);
    const [maxDate, setMaxDate] = useState(presentDate);

    const [sales, setSales] = useState<Sale[]>([]);

    useEffect(() => {

        // const dmin = `${minDate.getFullYear()}-${minDate.getMonth() < 10 ? "0" + (minDate.getMonth() + 1) : minDate.getMonth() + 1}-${minDate.getDate() < 10 ? "0" + minDate.getDate() : minDate.getDate()}`;
        // const dmax = `${maxDate.getFullYear()}-${maxDate.getMonth() < 10 ? "0" + (maxDate.getMonth() + 1) : maxDate.getMonth() + 1}-${maxDate.getDate() < 10 ? "0" + maxDate.getDate() : maxDate.getDate()}`;
        const dmin = minDate.toISOString().slice(0, 10);
        const dmax = maxDate.toISOString().slice(0, 10);

        axios.get(`${BASE_URL}/sales/?minDate=${dmin}&maxDate=${dmax}`)
            .then(response => {
                setSales(response.data.content);
            }).catch((error) => {
                alert("Ocorreu um erro ao buscar os itens");
            });

    }, [minDate, maxDate])

    return (
        <div className="dsmeta-card">
            <h2 className="dsmeta-sales-title">Vendas</h2>
            <div>
                <div id="datepicker-min" className="dsmeta-form-control-container">
                    <DatePicker
                        selected={minDate}
                        onChange={(date: Date) => { setMinDate(date) }}
                        className="dsmeta-form-control"
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Start Date"
                    />
                </div>
                <div id="datepicker-max" className="dsmeta-form-control-container">
                    <DatePicker
                        selected={maxDate}
                        onChange={(date: Date) => { setMaxDate(date) }}
                        className="dsmeta-form-control"
                        dateFormat="dd/MM/yyyy"
                        placeholderText="End Date"
                    />
                </div>
            </div>

            <div>
                <table className="dsmeta-sales-table">
                    <thead>
                        <tr>
                            <th className="show-from-990px">ID</th>
                            <th className="show-from-580px">Data</th>
                            <th>Vendedor</th>
                            <th className="show-from-990px">Visitas</th>
                            <th className="show-from-990px">Vendas</th>
                            <th>Total</th>
                            <th>Notificar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sales.map(sale => {
                                return <tr key={sale.id}>
                                    <td className="show-from-990px">{sale.id}</td>
                                    <td className="show-from-580px">{new Date(sale.date).toLocaleDateString()}</td>
                                    <td>{sale.sellerName}</td>
                                    <td className="show-from-990px">{sale.visited}</td>
                                    <td className="show-from-990px">{sale.deals}</td>
                                    <td>R$ {sale.amount.toFixed(2)}</td>
                                    <td>
                                        <div className="dsmeta-redbutton-form-container">
                                            <NotificationButton />
                                        </div>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default SalesCard;