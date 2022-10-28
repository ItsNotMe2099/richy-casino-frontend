import styles from './index.module.scss'
import InputField from 'components/ui/Inputs/InputField'
import Validator from 'utils/validator'
import {IPaymentMethodField, IPaymentMethodFieldType} from 'data/interfaces/IPaymentFields'
import PhoneField from 'components/ui/Inputs/PhoneField'
import {SelectField} from 'components/ui/Inputs/SelectField'


interface Props {
  fields: IPaymentMethodField[]
  sending?: boolean
  defaultCountry?: string
}
export const PaymentFormExtraFields = (props: Props) => {

  return (
   <>
     {props.fields.map(field => {
       if(field.isPaymentAddress){
         return  <div><div className={styles.label}>
           {field.title}
         </div>
           <InputField name={'address'} disabled={props.sending} className={styles.input} validate={field.isRequired ? Validator.required : null}/>
         </div>
       }
       if(field.key === 'card_pan'){
        return ( <div>
          <div className={styles.label}>{field.title}</div>
          <InputField name={field.key} disabled={props.sending} className={styles.input} format={'cardPan'} validate={Validator.combine([...(field.isRequired ? [Validator.required] : []), Validator.cardNumber])}/>
        </div>)
       }else if(field.key === 'card_expires'){
         return ( <div>
             <div className={styles.label}>{field.title}</div>
           <InputField name={field.key} placeholder={'MM/YY'} disabled={props.sending} className={styles.input} format={'cardExpiry'} validate={Validator.combine([...(field.isRequired ? [Validator.required] : []), Validator.cardExpiryValidation])}/>
         </div>)
       }else if(field.key === 'card_holder'){
         return ( <div>
           <div className={styles.label}>{field.title}</div>
           <InputField name={field.key} disabled={props.sending} className={styles.input} validate={field.isRequired ? Validator.required : null}/>
         </div>)
       }else if(field.key === 'card_cvv'){
         return ( <div>
           <div className={styles.label}>{field.title}</div>
           <InputField name={field.key}  disabled={props.sending} className={styles.input} format={'cardCvv'} validate={Validator.combine([...(field.isRequired ? [Validator.required] : []), Validator.cardCvc])}/>
         </div>)
       }

       switch (field.type){
         case IPaymentMethodFieldType.String:
         case IPaymentMethodFieldType.Number:

           if(field.key === 'phone') {
             return  <div>
               <div className={styles.label}>{field.title}</div>
               <PhoneField defaultCountry={props.defaultCountry} styleType={'vertical'} name={`extra_data.${field.key}`} disabled={props.sending}  className={styles.input} validate={Validator.combine([...(field.isRequired ? [Validator.required] : [])])}/>
             </div>

           }
           return  <div>
             <div className={styles.label}>{field.title}</div>
             <InputField name={`extra_data.${field.key}`} disabled={props.sending}  className={styles.input} validate={Validator.combine([...(field.isRequired ? [Validator.required] : []), ...(field.key === 'email' ? [Validator.email] : []) ])}/>
           </div>
         case IPaymentMethodFieldType.Dropdown:
           const options = Object.keys(field.options).map(key => ({label: field.options[key], value: key})).filter(i => !!i.label)
           if(!options.length){
             return null
           }
           return    <div> <div className={styles.label}>{field.title}</div>
             <SelectField name={`extra_data.${field.key}`}
                          options={Object.keys(field.options).map(key => ({label: field.options[key], value: key}))}
                          disabled={props.sending}
                          className={styles.input}
                          validate={field.isRequired ? Validator.required : null}
             />
           </div>

       }
     })}
   </>
  )
}
