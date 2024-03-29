USE [PruebaTecnicaDigitalBank]
GO
/****** Object:  Table [dbo].[Log]    Script Date: 2/02/2024 3:13:57 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Log](
	[IdLog] [bigint] IDENTITY(1,1) NOT NULL,
	[Tipo] [nvarchar](50) NOT NULL,
	[Metodo] [nvarchar](50) NOT NULL,
	[Valor] [nvarchar](max) NOT NULL,
	[Fecha] [date] NOT NULL,
 CONSTRAINT [PK_Log] PRIMARY KEY CLUSTERED 
(
	[IdLog] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Usuario]    Script Date: 2/02/2024 3:13:57 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuario](
	[IdUsuario] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](100) NOT NULL,
	[FechaNacimiento] [date] NOT NULL,
	[Sexo] [varchar](1) NOT NULL,
 CONSTRAINT [PK_Usuario] PRIMARY KEY CLUSTERED 
(
	[IdUsuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  StoredProcedure [dbo].[AdicionarLog]    Script Date: 2/02/2024 3:13:57 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Edward Serrano
-- Create date: 01/02/2024
-- Description:	Adiciona un Log
-- =============================================
CREATE     PROCEDURE [dbo].[AdicionarLog] 
	@Tipo varchar(50),
	@Metodo varchar(50),
	@Valor varchar(MAX)
AS
BEGIN
	SET NOCOUNT ON;
    INSERT INTO [PruebaTecnicaDigitalBank].[dbo].[Log] VALUES(@Tipo, @Metodo, @Valor, GETDATE());
	SELECT 0 AS Estado;
END
GO
/****** Object:  StoredProcedure [dbo].[AdicionarUsuario]    Script Date: 2/02/2024 3:13:57 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Edward Serrano
-- Create date: 01/02/2024
-- Description:	Adiciona un usuario
-- =============================================
CREATE   PROCEDURE [dbo].[AdicionarUsuario] 
	@IdUsuario int,
	@Nombre varchar(100),
	@FechaNacimiento Date,
	@Sexo varchar(1)
AS
BEGIN
	SET NOCOUNT ON;

    INSERT INTO [PruebaTecnicaDigitalBank].[dbo].[Usuario] VALUES(@Nombre, @FechaNacimiento, @Sexo);
	SELECT 0 AS Estado;
END
GO
/****** Object:  StoredProcedure [dbo].[ConsultarUsuario]    Script Date: 2/02/2024 3:13:57 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Edward Serrano
-- Create date: 01/02/2024
-- Description:	Consulta los usuario
-- =============================================
CREATE PROCEDURE [dbo].[ConsultarUsuario] 
AS
BEGIN
	SET NOCOUNT ON;

    SELECT [IdUsuario]
	  ,[Nombre]
      ,[FechaNacimiento]
      ,[Sexo]
	FROM [PruebaTecnicaDigitalBank].[dbo].[Usuario]
END
GO
/****** Object:  StoredProcedure [dbo].[EliminarUsuario]    Script Date: 2/02/2024 3:13:57 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Edward Serrano
-- Create date: 01/02/2024
-- Description:	Eliminar un usuario
-- =============================================
CREATE     PROCEDURE [dbo].[EliminarUsuario] 
	@IdUsuario int
AS
BEGIN
	SET NOCOUNT ON;
	DELETE FROM [PruebaTecnicaDigitalBank].[dbo].[Usuario] WHERE IdUsuario = @IdUsuario;
	SELECT 0 AS Estado;
END
GO
/****** Object:  StoredProcedure [dbo].[ModificarUsuario]    Script Date: 2/02/2024 3:13:57 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Edward Serrano
-- Create date: 01/02/2024
-- Description:	Modificar un usuario
-- =============================================
CREATE   PROCEDURE [dbo].[ModificarUsuario] 
	@IdUsuario int,
	@Nombre varchar(100),
	@FechaNacimiento Date,
	@Sexo varchar(1)
AS
BEGIN
	SET NOCOUNT ON;

	UPDATE [PruebaTecnicaDigitalBank].[dbo].[Usuario] SET Nombre = @Nombre, FechaNacimiento = @FechaNacimiento, Sexo = @Sexo
	WHERE IdUsuario = @IdUsuario;
	SELECT 0 AS Estado;
END
GO
