-- Habilitar RLS nas tabelas que ainda não têm
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.calculos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.calculos_salvos ENABLE ROW LEVEL SECURITY;

-- Políticas para a tabela profiles
CREATE POLICY "Users can view their own profile" 
  ON public.profiles 
  FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = id);

-- Políticas para a tabela calculos (corrigindo a conversão de tipos)
CREATE POLICY "Users can view their own calculations" 
  ON public.calculos 
  FOR SELECT 
  USING (auth.uid() = user_id::uuid);

CREATE POLICY "Users can create their own calculations" 
  ON public.calculos 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id::uuid);

CREATE POLICY "Users can update their own calculations" 
  ON public.calculos 
  FOR UPDATE 
  USING (auth.uid() = user_id::uuid);

CREATE POLICY "Users can delete their own calculations" 
  ON public.calculos 
  FOR DELETE 
  USING (auth.uid() = user_id::uuid);

-- Políticas para a tabela calculos_salvos (corrigindo a conversão de tipos)
CREATE POLICY "Users can view their own saved calculations" 
  ON public.calculos_salvos 
  FOR SELECT 
  USING (auth.uid() = user_id::uuid);

CREATE POLICY "Users can create their own saved calculations" 
  ON public.calculos_salvos 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id::uuid);

CREATE POLICY "Users can update their own saved calculations" 
  ON public.calculos_salvos 
  FOR UPDATE 
  USING (auth.uid() = user_id::uuid);

CREATE POLICY "Users can delete their own saved calculations" 
  ON public.calculos_salvos 
  FOR DELETE 
  USING (auth.uid() = user_id::uuid);

-- Atualizar a função handle_new_user para funcionar corretamente
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = 'public'
AS $function$
BEGIN
  INSERT INTO public.profiles (id, nome, email, is_admin, tipo_plano, tipo_usuario)
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data->>'nome', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.email,
    CASE 
      WHEN NEW.email = 'johnnysantos_177@msn.com' THEN TRUE
      ELSE FALSE
    END,
    CASE 
      WHEN NEW.email = 'johnnysantos_177@msn.com' THEN 'premium'
      ELSE 'padrao'
    END,
    CASE 
      WHEN NEW.email = 'johnnysantos_177@msn.com' THEN 'admin_mestre'
      ELSE 'usuario'
    END
  );
  RETURN NEW;
END;
$function$;

-- Criar o trigger se não existir
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Adicionar coluna 'resultados' do tipo text na tabela 'calculos_salvos' para armazenar o JSON completo dos resultados do cálculo
ALTER TABLE public.calculos_salvos ADD COLUMN resultados text;
