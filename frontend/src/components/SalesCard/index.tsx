import axios from "axios";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import NotificationButton from "../NotificationButton";
import "./style.css";

function SalesCard() {

    const initialDate = new Date(new Date().setDate(new Date().getDate() - 365));
    const presentDate = new Date();

    const [minDate, setMinDate] = useState(initialDate);
    const [maxDate, setMaxDate] = useState(presentDate);

    useEffect(() => {
        axios.get("http://localhost:8080/sales/")
            .then(response => {
                console.log(response.data);
            });
    }, [])

    return (
        <div className="dsmeta-card">
            <h2 className="dsmeta-sales-title">Vendas</h2>
            <div>
                <div className="dsmeta-form-control-container">
                    <DatePicker
                        selected={minDate}
                        onChange={(date: Date) => { setMinDate(date) }}
                        className="dsmeta-form-control"
                        dateFormat="dd/MM/yyyy"
                    />
                </div>
                <div className="dsmeta-form-control-container">
                    <DatePicker
                        selected={maxDate}
                        onChange={(date: Date) => { setMaxDate(date) }}
                        className="dsmeta-form-control"
                        dateFormat="dd/MM/yyyy"
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
                        <tr>
                            <td className="show-from-990px">#341</td>
                            <td className="show-from-580px">08/08/2022</td>
                            <td>Anakin</td>
                            <td className="show-from-990px">15</td>
                            <td className="show-from-990px">11</td>
                            <td>55300.00</td>
                            <td>
                                <div className="dsmeta-redbutton-form-container">
                                    <NotificationButton />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="show-from-990px">#341</td>
                            <td className="show-from-580px">08/08/2022</td>
                            <td>Anakin</td>
                            <td className="show-from-990px">15</td>
                            <td className="show-from-990px">11</td>
                            <td>55300.00</td>
                            <td>
                                <div className="dsmeta-redbutton-form-container">
                                    <NotificationButton />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="show-from-990px">#341</td>
                            <td className="show-from-580px">08/08/2022</td>
                            <td>Anakin</td>
                            <td className="show-from-990px">15</td>
                            <td className="show-from-990px">11</td>
                            <td>55300.00</td>
                            <td>
                                <div className="dsmeta-redbutton-form-container">
                                    <NotificationButton />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default SalesCard;