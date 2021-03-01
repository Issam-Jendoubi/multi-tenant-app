import { Column, Entity, Index, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class Tenant {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  @Index({ unique: true })
  subDomain: string;

  @Column()
  firstName: string;

  @Column()
  monthlyPayment: string;

  @Column()
  email: string;
}
